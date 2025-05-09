import { useState } from "react";
import { Button, Card, Input, message, Select } from "antd";

import { companyService } from "&src/api/setting";

const { Option } = Select;

const Home = () => {
  const [loading, setLoading] = useState(false);

  const [platform, setPlatform] = useState("bili");
  const [type, setType] = useState("detail");
  const [targetIds, setTargetIds] = useState("");

  const handleClick = async () => {
    if (!targetIds) {
      message.warning("请输入target_ids");
      return;
    }

    setLoading(true);
    try {
      const data = await companyService.python({
        platform,
        target_ids: targetIds
          .split("\n")
          .map(id => id.trim())
          .filter(id => !!id),
      });

      // 创建下载链接
      // const url = window.URL.createObjectURL(new Blob([data as unknown as BlobPart]));
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute("download", `${platform}_data.zip`);
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      // window.URL.revokeObjectURL(url);

      // message.success("下载成功");

      if (data.status === -1) {
        message.error(data.message);
        return;
      }

      message.success("任务执行成功，可前往后台查看");
    } catch (error) {
      console.error(error);
      message.error("请求失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[1100px] m-auto">
      <Card
        title={
          <div className="flex justify-between">
            <div>配置</div>

            <a href="http://m.sky.yh/gather/crawler" target="_blank" rel="noreferrer">
              后台地址
            </a>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <Select disabled={loading} value={platform} onChange={setPlatform} style={{ width: 200, marginRight: 16 }}>
            <Option value="bili">哔哩哔哩</Option>
            <Option value="dy">抖音</Option>
            <Option value="wb">微博</Option>
            <Option value="xhs">小红书</Option>
            {/* <Option value="ks">快手</Option>
            <Option value="tieba">贴吧</Option>
            <Option value="zhihu">知乎</Option> */}
          </Select>

          <Select disabled={loading} value={type} onChange={setType} style={{ width: 200, marginRight: 16 }}>
            <Option value="detail">评论</Option>
            {/* <Option value="bili">作者</Option>
            <Option value="bili">关键词</Option> */}
          </Select>

          <Input.TextArea
            value={targetIds}
            disabled={loading}
            className="min-h-[200px] w-1/2"
            autoSize={{ minRows: 3 }}
            placeholder="输入需要抓去的视频/文章 ID 每行一个, 小红书请填写链接"
            onChange={e => setTargetIds(e.target.value)}
          />

          <div>
            <Button type="primary" loading={loading} onClick={handleClick}>
              {loading ? "任务执行中" : "开始任务"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;
