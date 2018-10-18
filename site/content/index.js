import { importAll, importMdUrl} from '../utils'

const mdAllUrl = require.context('../../src/components/', true, /\.md$/)
export const mdFileUrl = importMdUrl(mdAllUrl)

const mdAllReadme = require.context('../../src/components/', true, /README\.md$/)
export const mdAllMeta = importAll(mdAllReadme)
