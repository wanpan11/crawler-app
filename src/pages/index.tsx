import { useState } from "react";
import { Button, Card, Input, message, Select } from "antd";

import { companyService } from "&src/api/setting";

const { Option } = Select;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [platform, setPlatform] = useState("bili");
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
        target_ids: targetIds.split("\n").map(id => id.trim()),
      });
      console.log(data);
      message.success("请求成功");
    } catch (error) {
      console.error(error);
      message.error("请求失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[1100px] m-auto">
      <Card title={"配置"}>
        <div className="flex flex-col gap-4">
          <Select disabled={loading} value={platform} onChange={setPlatform} style={{ width: 200, marginRight: 16 }}>
            <Option value="xhs">小红书</Option>
            <Option value="dy">抖音</Option>
            <Option value="ks">快手</Option>
            <Option value="bili">哔哩哔哩</Option>
            <Option value="wb">微博</Option>
            <Option value="tieba">贴吧</Option>
            <Option value="zhihu">知乎</Option>
          </Select>

          <Input.TextArea
            value={targetIds}
            disabled={loading}
            className="min-h-[200px] w-1/2"
            autoSize={{ minRows: 3 }}
            placeholder="输入target_ids，每行一个"
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
