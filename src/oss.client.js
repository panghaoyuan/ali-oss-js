const OSS = require('ali-oss');
const util = require('util');
const fs = require('fs');
const path = require('path');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

class OssClient {
  constructor() {
    this.client = new OSS({
      region: 'xxxxxxxxxxx',
      accessKeyId: 'xxxxxxxxxxx', // process.env.ACCESSKEYID,
      accessKeySecret: 'xxxxxxxxxxx', // process.env.ACCESSKEYSECRET,
      bucket: process.env.NODE_ENV === 'production' ? 'xxxxxxxxxxx' : 'xxxxxxxxxxx', // process.env.BUCKET,
    });
  }

  async putStream(dir, ossDir = '/', fileName) {
    try {
      const stream = fs.createReadStream(path.resolve(dir, fileName));
      return await this.client.putStream(ossDir + fileName, stream);
    } catch (e) {
      console.log(e);
    }
  }

  async putDir(dir, ossDir) {
    let files;
    try {
      files = await readdir(dir);
    } catch (e) {
      console.log(`【当前目录不存在】 -- ${dir} --`);
      return undefined;
    }

    for (const i in files) {
      const state = await stat(`${dir}/${files[i]}`);
      if (state.isDirectory()) {
        await this.putDir(`${dir}/${files[i]}`, `${ossDir}/${files[i]}`);
      } else {
        await this.putStream(dir, `${ossDir}/`, files[i]);
      }
    }
  }

  async upload() {
    try {
      await this.putDir(path.resolve(__dirname, 'dist'), 'sass-erp-page');
    } catch (e) {
      console.log('【上传异常请重试】', e);
    }
  }
}

new OssClient().upload()
  .then(() => {
    console.log('上传成功')
  })
  .catch((error) => {
    console.log('上传异常', error);
  });
