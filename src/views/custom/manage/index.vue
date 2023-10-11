<template>
  <div class="node-conatiner">
    <h2 class="nc_title font18">客户线索</h2>
    <Table
      ref="ELRef"
      :url="fetchApi.list"
      :columns="columns"
      :items="tableFilterItems"
      :button="tableFilterButton"
      :actions="tableActions"
      :model="tableFilterModel"
      :scroll="{ x: 1800 }"
    />
    <Modal v-bind="modalState" @cancel="handleCancel" @ok="handleSubmit">
      <a-form
        ref="FormRef"
        :model="formModel"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="客户:" name="name">
          <a-input v-model:value="formModel.name" placeholder="请输入客户姓名" />
        </a-form-item>
        <a-form-item label="手机号:" name="phone">
          <a-input v-model:value="formModel.phone" placeholder="请输入客户手机号" />
        </a-form-item>
        <a-form-item label="邮箱:" name="email">
          <a-input v-model:value="formModel.email" placeholder="请输入客户邮箱" />
        </a-form-item>
        <a-form-item label="性别:" name="sex">
          <a-input v-model:value="formModel.sex" placeholder="请输入客户性别" />
        </a-form-item>
        <a-form-item label="推荐人:" name="support">
          <a-input v-model:value="formModel.support" placeholder="请输入客户性别" />
        </a-form-item>
        <a-form-item label="已购房子:" name="buyed">
          <a-input v-model:value="formModel.buyed" placeholder="请输入已购房子地址" />
        </a-form-item>
        <a-form-item label="合同编号:" name="contract">
          <a-input v-model:value="formModel.contract" placeholder="请输入合同编号" />
        </a-form-item>
        <a-form-item label="销售名单:" name="salers">
          <a-input v-model:value="formModel.salers" placeholder="请输入客户销售名单" />
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>
<script setup lang="ts">
  import { columns } from './constant';
  import fetchApi from '/@/api/home';
  import { useMessage } from '/@/hooks/useMessage';
  import { validatePhone } from '/@/utils/validate';
  import type { FormInstance } from 'ant-design-vue';
  import type { Rule } from 'ant-design-vue/es/form';

  const mockReq = (params?: any): Promise<Boolean> =>
    new Promise((resolve) => setTimeout(() => resolve(params ? !!params : true), 500));

  const { createMessage } = useMessage();
  const FormRef = ref<FormInstance>();
  const ELRef = ref<{ refresh: () => void }>();
  const refresh = () => ELRef.value?.refresh(); // 参数不变，直接更新
  // const run = (args) => ELRef.value.run(args); // Table提供run方法接受参数，做到更自由控制数据更新

  const labelCol = { style: { width: '110px' } };
  const wrapperCol = { span: 17 };
  // modal
  const modalState = reactive({
    loading: false,
    visible: false,
    title: '创建客户',
    okText: '创建',
  });

  // form
  const rules: Record<string, Rule[]> = {
    name: [{ required: true, trigger: 'blur', validator: validatePhone }],
    sex: [
      {
        required: true,
        trigger: 'change',
        validator: (_, val) => (val ? Promise.resolve() : Promise.reject('请选择角色')),
      },
    ],
    salers: [
      {
        required: true,
        trigger: 'change',
        validator: (_, val) => (val ? Promise.resolve() : Promise.reject('请输入销售人员')),
      },
    ],
    contract: [
      {
        required: true,
        trigger: 'change',
        validator: (_, val) => (val ? Promise.resolve() : Promise.reject('请输入合同编号')),
      },
    ],
    buyed: [
      {
        required: true,
        trigger: 'change',
        validator: (_, val) => (val ? Promise.resolve() : Promise.reject('请输入房子地址')),
      },
    ],
  };
  const formModel = ref({
    name: '',
    age: '',
    phone: '',
    sex: '',
    email: '',
    salers: '',
    contract: '',
    buyed: '',
    support: '',
  });

  const tableActions = reactive([
    {
      label: '查看合同',
      // auth: AuthEnum.user_update,
      onClick: async (row) => {},
    },
    {
      label: '编辑',
      // auth: AuthEnum.user_update,
      onClick: async (row) => {
        modalState.title = '修改客户';
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
          createMessage.success(`${modalState.title === '新增' ? '新增' : '修改'}客户成功`);
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
    label: '新增客户',
    // auth: AuthEnum.user_create,
    onClick: () => {
      modalState.title = '新增客户';
      modalState.okText = '创建';
      modalState.visible = true;
    },
  });

  const tableFilterItems = computed(() => [
    {
      type: 'search',
      name: 'search',
      placeholder: '请输入客户姓名/年龄/购房意向或居住地查询',
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
