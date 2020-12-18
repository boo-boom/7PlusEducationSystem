import { reactive, onMounted } from "vue";
// 引入请求方式
import { httpGet } from "@/utils/http";
// 引入请求接口
import user from "@/api/userAPI";
export const useGetLog = id => {
  // 表格数据
  const loglData = reactive({
    // 表格数据
    data: []
  });
  //#region 分页配置项
  const logPagination = reactive({
    // 第几页
    current: 1,
    // 每页显示多少条
    pageSize: 10,
    // 每页允许显示多少条
    pageSizeOptions: ["10"],
    // 总数
    total: 0,
    // 允许改变每页条数
    showSizeChanger: true
  });
  //#endregion 分页配置项
  // 获取后台数据
  const getLogData = async () => {
    const res = await httpGet(user.LoginJournal + `/${id}`, {
      // 降序
      descColumns: "createTime",
      pageNum: logPagination.current,
      pageSize: logPagination.pageSize
    });
    if (res.code == 200) {
      // 数据
      loglData.data = res.data.records;
      // 数据总数
      logPagination.total = res.data.total;
    }
  };
  // 页码改变回调
  const onTableChange = pagination => {
    logPagination.current = pagination.current;
    logPagination.pageSize = pagination.pageSize;
    getLogData();
  };
  // 初始化获取数据
  onMounted(() => {
    getLogData();
  });
  return {
    loglData,
    logPagination,
    onTableChange
  };
};
