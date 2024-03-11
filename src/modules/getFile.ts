import axios from '@/utils/axios'
import fse from 'fs-extra'

interface File {
    id: string
    name: string
    path: string
    thumb: boolean
    size: number
    type: string
    date: string
    create_date: string
    source_enabled: boolean
}

const file: File[] = []
export const getFile = async (path: string) => {
    const { data: result } = await axios.get('/directory' + path)
    for (const item of result.data.objects) {
        if (item.type === 'dir') {
            await getFile(path + '/' + item.name)
        } else {
            file.push(item)
            console.log(item)
        }
    }
    fse.writeFileSync('./data/file.json', JSON.stringify(file))
}

export const getId = async () => {
    const file: File[] = JSON.parse(fse.readFileSync('./data/file.json').toString())
    let id = ''
    file.forEach((e) => {
        id += e.id + '\n'
    })
    fse.writeFileSync('./data/id.txt', id)
}

export const getDownloadLink = async () => {
    const link: string[] = []
    for (const file of JSON.parse(fse.readFileSync('./data/file.json').toString())) {
        const { data: result } = await axios.put('/file/download/' + file.id)
        link.push(result.data)
        console.log(result.data)
    }
    fse.writeFileSync('./data/link.txt', link.join('\n'))
    fse.writeFileSync('./data/link.json', JSON.stringify(link))
}

export const getPath = () => {
    const file: File[] = JSON.parse(fse.readFileSync('./data/file.json').toString())
    const path = file.map((e) => {
        const path = e.path === '/' ? '' : e.path
        return path + '/' + e.name
    })
    fse.writeFileSync('./data/path.txt', path.join('\n'))
}
