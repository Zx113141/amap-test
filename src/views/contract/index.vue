<template>
  <div class="node-conatiner">
    <h2 class="nc_title font18">合同管理</h2>
    <Table
      ref="ELRef"
      :url="fetchApi.node_list"
      :columns="columns"
      :items="tableFilterItems"
      :button="tableFilterButton"
      :actions="tableActions"
      :model="tableFilterModel"
    />
    <Modal v-bind="modalState" @cancel="handleCancel" @ok="handleSubmit">
      <a-form
        ref="FormRef"
        :model="formModel"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="合同名称:" name="mobile">
          <a-input v-model:value="formModel.mobile" placeholder="请输入合同名称" />
        </a-form-item>
        <a-form-item label="合同编号:" name="mobile">
          <a-input v-model:value="formModel.mobile" placeholder="请输入合同编号" />
        </a-form-item>
        <a-form-item label="合同签订时间:" name="markTime">
          <a-date-picker>
            <template #suffixIcon>
              <SmileOutlined />
            </template>
          </a-date-picker>
        </a-form-item>
        <a-form-item label="合同签订客户:" name="custom">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="合同上传:" name="custom">
          <Upload></Upload>
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>
<script setup lang="ts">
  import { columns } from './constant';
  import fetchApi from '/@/api/common';
  import { useMessage } from '/@/hooks/useMessage';
  import { validatePhone } from '/@/utils/validate';
  import type { FormInstance } from 'ant-design-vue';
  import type { Rule } from 'ant-design-vue/es/form';
  import Upload from '/@/components/Upload/index.vue';

  const mockReq = (params?: any): Promise<Boolean> =>
    new Promise((resolve) => setTimeout(() => resolve(params ? !!params : true), 500));

  const { createMessage } = useMessage();
  const FormRef = ref<FormInstance>();
  const ELRef = ref<{ refresh: () => void }>();
  const refresh = () => ELRef.value?.refresh(); // 参数不变，直接更新
  // const run = (args) => ELRef.value.run(args); // Table提供run方法接受参数，做到更自由控制数据更新

  const labelCol = { style: { width: '110px' } };
  const wrapperCol = { span: 17 };

  const roleOptions = computed(() => [
    { label: '管理员', value: 1 },
    { label: '普通', value: 2 },
  ]);
  // modal
  const modalState = reactive({
    loading: false,
    visible: false,
    title: '创建用户',
    okText: '创建',
  });

  // form
  const rules: Record<string, Rule[]> = {
    mobile: [{ required: true, trigger: 'blur', validator: validatePhone }],
    role_id: [
      {
        required: true,
        trigger: 'change',
        validator: (_, val) => (val ? Promise.resolve() : Promise.reject('请选择角色')),
      },
    ],
  };
  const formModel = ref({
    mobile: '',
    role_id: undefined,
  });

  const tableActions = reactive([
    {
      label: '查看合同',
      // auth: AuthEnum.user_update,
      onClick: async (row) => {
        modalState.title = '查看合同';
        modalState.okText = '查看';
        modalState.visible = true;
      },
    },
    {
      label: '编辑',
      // auth: AuthEnum.user_update,
      onClick: async (row) => {
        modalState.title = '修改合同';
        modalState.okText = '更新';
        modalState.visible = true;
        formModel.value = row;
      },
    },
    {
      label: '删除',
      popConfirm: {
        title: '确认删除吗？',
        onConfirm: async (row) => {
          console.log('row', row);
          const res = await mockReq();
          if (res) {
            createMessage.success('删除成功');
            refresh();
          }
        },
      },
    },
  ]);

  const handleCancel = () => {
    modalState.visible = false;
    FormRef.value?.resetFields();
  };

  const handleSubmit = () => {
    FormRef.value
      ?.validate()
      .then(async () => {
        modalState.loading = true;
        // const req = modalState.title === '新增用户' ? store.fetchCreate : store.fetchUpdate;
        const res = await mockReq(formModel.value);
        modalState.loading = false;
        if (res) {
          createMessage.success(`${modalState.title === '新增' ? '新增' : '修改'}合同成功`);
          handleCancel();
          console.log('ELRef.value', ELRef.value);
          refresh();
        }
      })
      .catch(console.log);
  };

  // filter
  const tableFilterModel = reactive({ role_id: undefined, search: '' });
  const tableFilterButton = reactive({
    type: 'primary',
    label: '新增合同',
    // auth: AuthEnum.user_create,
    onClick: () => {
      modalState.title = '新增合同';
      modalState.okText = '创建';
      modalState.visible = true;
    },
  });

  const tableFilterItems = computed(() => [
    {
      type: 'input',
      name: 'input',
      placeholder: '请输入合同名称',
    },
    {
      type: 'search',
      name: 'search',
      placeholder: '请输入姓名或账号进行查询',
    },
  ]);
</script>
<style lang="less" scoped>
  .node-conatiner {
    .nc_title {
      margin-top: 6px;
      margin-bottom: 30px;
    }
  }
</style>
