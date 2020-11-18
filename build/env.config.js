const path = require('path')

/*
 * 环境列表
 * dirName: 打包的路径，只在build的时候有用
 * baseUrl: php 接口域名
 * baseJavaUrl: java 接口域名
 * port: 开发环境本地端口
 * skUrl: 秒杀课域名
 * assetsPublicPath: 静态资源存放的域名，未指定则使用相对路径
 * cdnPublicPath: 公共资源路径
 * cookieDomain: cookie 域
 * */
const ENV_LIST = {
  // 测试
  development: {
    dirName: path.resolve(__dirname, '../dist'),
    baseUrl: '"//testapi.huatu.com"',
    baseJavaUrl: '"//123.103.86.52"',
    skUrl: '"//sk.test.htexam.net/class/"',
    port: 8088,
    cdnPublicPath: '//testm.v.htexam.net/',
    envUrl: '"/wap/#/"',
    pcUrl:'"//test.htexam.net"'
  },
  // 正式
  production: {
    dirName: path.resolve(__dirname, '../dist'),
    baseUrl: '"//api.huatu.com"',
    baseJavaUrl: '"//ns.huatu.com"',
    skUrl: '"//sk.v.huatu.com/class/"',
    port: 8089,
    cdnPublicPath: '/',
    envUrl: '"/wap/#/"',
    pcUrl:'"//v.huatu.com"'

  }
}
const cookieDomain =(()=>{
  if (process.env.LOCAL_ENV === 'local') {
    return '""'
  }
  return '"huatu.com"'
  // return process.env.NODE_ENV === 'development' ? '"htexam.net"' : '"huatu.com"'
  // return process.env.NODE_ENV === 'development' ? '""' : '"huatu.com"'
  }
)();

const env = { ...ENV_LIST[process.env.NODE_ENV], cookieDomain }

const defines = Object.keys(env).map(e => `${e}：${env[e]}`)

const nobug = `
          .,:,,,                                        .::,,,::.
        .::::,,;;,                                  .,;;:,,....:i:
        :i,.::::,;i:.      ....,,:::::::::,....   .;i:,.  ......;i.
        :;..:::;::::i;,,:::;:,,,,,,,,,,..,.,,:::iri:. .,:irsr:,.;i.
        ;;..,::::;;;;ri,,,.                    ..,,:;s1s1ssrr;,.;r,
        :;. ,::;ii;:,     . ...................     .;iirri;;;,,;i,
        ,i. .;ri:.   ... ............................  .,,:;:,,,;i:
        :s,.;r:... ....................................... .::;::s;
        ,1r::. .............,,,.,,:,,........................,;iir;
        ,s;...........     ..::.,;:,,.          ...............,;1s
       :i,..,.              .,:,,::,.          .......... .......;1,
      ir,....:rrssr;:,       ,,.,::.     .r5S9989398G95hr;. ....,.:s,
     ;r,..,s9855513XHAG3i   .,,,,,,,.  ,S931,.,,.;s;s&BHHA8s.,..,..:r:
    :r;..rGGh,  :SAG;;G@BS:.,,,,,,,,,.r83:      hHH1sXMBHHHM3..,,,,.ir.
   ,si,.1GS,   sBMAAX&MBMB5,,,,,,:,,.:&8       3@HXHBMBHBBH#X,.,,,,,,rr
   ;1:,,SH:   .A@&&B#&8H#BS,,,,,,,,,.,5XS,     3@MHABM&59M#As..,,,,:,is,
  .rr,,,;9&1   hBHHBB&8AMGr,,,,,,,,,,,:h&&9s;   r9&BMHBHMB9:  . .,,,,;ri.
  :1:....:5&XSi;r8BMBHHA9r:,......,,,,:ii19GG88899XHHH&GSr.      ...,:rs.
  ;s.     .:sS8G8GG889hi.        ....,,:;:,.:irssrriii:,.        ...,,i1,
  ;1,         ..,....,,isssi;,        .,,.                      ....,.i1,
  ;h:               i9HHBMBBHAX9:         .                     ...,,,rs,
  ,1i..            :A#MBBBBMHB##s                             ....,,,;si.
  .r1,..        ,..;3BMBBBHBB#Bh.     ..                    ....,,,,,i1;
   :h;..       .,..;,1XBMMMMBXs,.,, .. :: ,.               ....,,,,,,ss.
    ih: ..    .;;;, ;;:s58A3i,..    ,. ,.:,,.             ...,,,,,:,s1,
    .s1,....   .,;sh,  ,iSAXs;.    ,.  ,,.i85            ...,,,,,,:i1;
     .rh: ...     rXG9XBBM#M#MHAX3hss13&&HHXr         .....,,,,,,,ih;
      .s5: .....    i598X&&A&AAAAAA&XG851r:       ........,,,,:,,sh;
      . ihr, ...  .         ..                    ........,,,,,;11:.
         ,s1i. ...  ..,,,..,,,.,,.,,.,..       ........,,.,,.;s5i.
          .:s1r,......................       ..............;shs,
          . .:shr:.  ....                 ..............,ishs.
              .,issr;,... ...........................,is1s;.
                 .,is1si;:,....................,:;ir1sr;,
                    ..:isssssrrii;::::::;;iirsssssr;:..
                         .,::iiirsssssssssrri;;:.

                         神兽保佑，代码无bug...
`

console.log(`${nobug}\n环境:\n${defines.join('\n')}`)

module.exports = env
