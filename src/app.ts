import { getFile, getId, getDownloadLink, getPath } from '@/modules/getFile'
import config from '@/utils/config'
// id: '7EYaoJHX',
// name: 'note.rar',
// path: '/',
// thumb: false,
// size: 8815512,
// type: 'file',
// date: '2024-02-19T02:52:33+08:00',
// create_date: '2023-12-20T14:34:20+08:00',
// source_enabled: false

if (config.action.getFile) {
    await getFile('')
}

if (config.action.getId) {
    await getId()
}

if (config.action.getDownloadLink) {
    await getDownloadLink()
}

if (config.action.getPath) {
    getPath()
}

console.log(`任务执行完成`)
