- **问题的发现**：在开发过程中，发现mock数据更改之后没有生效，只能重启服务才能生效
- **问题原因**：mock文件数据是通过全局环境变量写入代码里的，环境变量无法重写，只在初始化代码的时候生效一次，所以数据变更之后无法生效
   ```
   process.env.SAN_VAR_MOCKDATAS = JSON.stringify(mockDatas);
   ```
- **解决思路**：
    1. 摒弃环境变量获取json数据的方式
    2. 通过读取文件内容的方式去获取各个json文件数据&&封装成方法，供文件更新时调用
    ```
    const readMockData = () => {
        // 这里遍历mock 文件夹，获取 mock 数据
        fs.readdir(componentMockFolder, (err, items) => {
            mockDatas = items.map(p => jsonfile.readFileSync(path.resolve(componentMockFolder, p)));
        });
        mockDatas.length === 0 && (mockDatas.push({}));
        return mockDatas;
    }
    ```
    3. 通过middleware plugin去实现文件变更时重写json数据
    ```
    {
        id: 'middleware-mock',
        apply(api) {
            api.middleware(() => {
                return (req, res, next) => {
                    if (req.originalUrl.indexOf('hot-update.json') === -1) {
                        fs.writeFileSync('public/data.json', JSON.stringify(readMockData() || {}));
                        next();
                    }
                };
            });
        }
    }
    ```
    4. 此时虽然实现了更新，但是只能实现手动刷新浏览器更新，所以需要在devserver里加上`watchContentBase`来实现热更新。注意contentBase & watchContentBase在此处时配合使用的，contentBase代表的是更新的路径。
    ```
    contentBase: path.resolve(componentSrcFolder),
    watchContentBase: true,
    ```
- **遇到的问题**:
1.  通过读取文件内容的方式去获取各个json文件数据时，发现改变文件内容时，热更新时写入文件没有生效

    > 原因：require方法有缓存，所以读取的文件标识未变更，`require(path.resolve(componentMockFolder, p))`

    > 解决：引入jsonfile，通过jsonfile的方式去替换require，`jsonfile.readFileSync(path.resolve(componentMockFolder, p))`
    
    > 参考：https://www.npmjs.com/package/jsonfile

2. 在重写文件时，此时刷新已经可以生效，但是会有很多多余的hot-update的请求一直发出，此处通过判断过滤掉多余的请求
    ```
    if (req.originalUrl.indexOf('hot-update.json') === -1)
    ```
    > 参考：https://expressjs.com/en/guide/using-middleware.html
3. 在完成解决步骤1-4之后，基本已经实现了需要的功能，但是有一点瑕疵：json文件需要`command + s`两次及以上才会生效，对于ts，less等文件，修改之后保存一次便可生效

    > 原因：保存时开发文件已经编译过了，所以会拿到新的编译文件，但是json文件是本地静态文件，需要通过读文件&写入文件的操作才能生效，这里有一个先后顺序的问题，重写文件在修改编译完之后的话，需要多保存几次才会生效

    > 解决：在编译的beforecompile阶段去写入文件，即步骤5，明天解决了补充
    
    > 参考：https://webpack.js.org/api/compiler-hooks/#beforecompile
