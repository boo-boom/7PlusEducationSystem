//#region 添加MCM题型
// 引入响应式API
import { reactive, ref } from "vue";
// 引入提示框
import { message } from "ant-design-vue";
// 导入 post 请求
import { httpPost } from "@/utils/http";
// 导入听力题库接口配置
import { listen } from "@/api/questionListenAPI";

/**
 * 导出添加MCM题型 功能
 * @param {*} addModalVisible 添加模态框的显示与隐藏
 * @param {*} getQuestion 重新获取列表
 */
export function useAddMCM(addModalVisible, getQuestion) {
  // 表单数据 校验规则
  const addMCM = reactive({
    model: {
      // 编号
      no: "",
      // 题目
      title: "",
      // 标签选择
      labelIds: [],
      // 题目音频
      titleAudio: "",
      // 题目原文
      titleText: "",
      // 题目问题
      titleQuestion: "",
      // 题目选项
      choices: [
        {
          content: "",
          key: "A"
        }
      ],
      // 题目解析
      titleAnalysis: "",
      // 答案参考
      answer: [],
      // 备注
      remark: ""
    },
    // 校验规则
    rules: {
      // 编号
      no: [
        {
          required: true,
          whitespace: true,
          message: "题目编号必须填写",
          trigger: "blur"
        }
      ]
    }
  });

  // 表单ref
  const addMCMRef = ref(null);

  // 改变选择标签时
  const changeLabels = checkedValue => {
    // 限制只能选择三个标签
    if (checkedValue.length > 3) {
      // 去掉第一个
      checkedValue.shift();
      message.warn("每题标签最多可以选择三个");
    }
  };

  // 添加题目选项
  const addChoices = () => {
    addMCM.model.choices.push({
      content: "",
      // A、B、C、D...
      key: String.fromCharCode(addMCM.model.choices.length + 65)
    })
  }

  // 删除题目选项
  const delChoices = (index) => {
    addMCM.model.choices.splice(index, 1);
    // 重置一下选项答案
    addMCM.model.answer = []
  }

  // 添加MCM题目
  const confirmAddMCM = () => {
    // 先校验
    addMCMRef.value.validate().then(() => {
      // 发送添加题目请求
      httpPost(listen.AddQuestion('mcm'), addMCM.model).then((res) => {
        if (res.success == true) {
          // 提示用户添加成功
          message.success("添加题目成功");
          // 刷新页面
          getQuestion()
          // 关闭mcm/smw/hcs模态框
          addModalVisible.mcm = false;
        }
        else {
          // 添加失败，提示用户失败原因
          message.error(res.message);
        }
      }).catch((err) => {
        console.log(err);
      });
    }).catch(err => {
      console.log(err);
    });
  };

  // 取消添加mcm题目
  const cancelAddMCM = () => {
    // 提示用户
    message.warn(`取消添加mcm题目`);
    // 重置表单
    addMCMRef.value.resetFields();
  };

  return {
    addMCM,
    addMCMRef,
    changeLabels,
    addChoices,
    delChoices,
    confirmAddMCM,
    cancelAddMCM
  };
}
//#endregion
