import { Tooltip, Tag } from 'ant-design-vue';
import { ColumnProps } from 'ant-design-vue/es/table';

export const columns: ColumnProps[] = [
    {
        title: '姓名',
        dataIndex: 'name',
        width: 100,
    },
    {
        title: '年龄',
        dataIndex: 'age',
        width: 80,
    },
    {
        title: '性别',
        dataIndex: 'sex',
        width: 80,
        customRender: ({ text }) => {

            return (
                <span>
                    {text || '-'}
                </span>
            )
        },
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        width: 150,
    },
    {
        title: '已购房子',
        dataIndex: 'buyed',
        width: 180,
        // ellipsis: true,
        customRender: ({ text }) => (
            text ? text : '-'
        ),
    },
    {
        title: '购房平台',
        dataIndex: 'platform',
        width: 180,
        customRender: ({ text }) => text || '-',
        // fixed: 'right',
    },
    {
        title: '销售名单',
        dataIndex: 'salers',
        width: 180,
        customRender: ({ text }) => text || '-',
        // fixed: 'right',
    },
    {
        title: '合同编号',
        dataIndex: 'contract',
        width: 180,
        customRender: ({ text }) => text || '-',
        // fixed: 'right',
    },
    {
        title: '创建日期',
        dataIndex: 'created_at',
        // slots: { customRender: 'toDateTime' }, // 该用法已废弃
        key: 'toDateTime',
        width: 150,
    },
    {
        title: '更新日期',
        dataIndex: 'updated_at',
        width: 170,
    },

    {
        title: '操作',
        key: 'action',
        width: 200,
        // slots: { customRender: 'action' },
    },
];


