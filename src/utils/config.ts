import fse from 'fs-extra'
import yaml from 'yaml'

const defaultConfig = {
    session: 'your-session',
    url: 'https://www.gov.cn/api/v3',
    action: {
        getFile: true,
        getId: true,
        getDownloadLink: true,
        getPath: true
    }
}

// 判断并创建 data 文件夹
if (!fse.existsSync('./data')) {
    fse.mkdirSync('./data')
}

if (!fse.existsSync('./config.yaml')) {
    fse.writeFileSync('./config.yaml', yaml.stringify(defaultConfig))
    console.log('配置文件创建成功，请修改配置文件后重启程序')
    process.exit(0)
}

const config = yaml.parse(
    fse.readFileSync('./config.yaml').toString()
) as typeof defaultConfig

export default config
