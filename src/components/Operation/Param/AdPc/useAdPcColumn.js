/**
 * @author Lemon
 * 广告位-pc表格格式
 * */
export const useAdPcColumn = () => {
  const adPcColumn = [
    {
      title: "轮播图顺序",
      dataIndex: "sort",
      key: "sort"
    },
    {
      title: "广告位",
      slots: { customRender: "ad" },
      width: "50%"
    },
    {
      title: "备注",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "链接",
      dataIndex: "link",
      key: "link"
    },
    {
      title: "操作",
      slots: { customRender: "operational" }
    }
  ];

  return {
    adPcColumn
  };
};
