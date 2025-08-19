import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Table, Button, Badge } from '@/components/ui';
import type { TableProps } from '@/components/ui';
import { PlusOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { getOrders, Order } from '@/mocks/orders';

const Orders = () => {
  const { t } = useTranslation(['menu', 'common']);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getOrders(currentPage, pageSize);
        setOrders(response.data.items);
        setTotal(response.data.total);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage, pageSize]);

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'warning',
      processing: 'processing',
      shipped: 'processing',
      delivered: 'success',
      cancelled: 'error'
    } as const;
    return colors[status] || 'default';
  };

  const handleDeleteSelected = () => {
    console.log('Delete selected orders:', selectedRowKeys);
    // TODO: Implement delete logic
    setSelectedRowKeys([]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const columns: TableProps<Order>['columns'] = [
    {
      title: 'Order',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      sorter: (a, b) => a.orderNumber.localeCompare(b.orderNumber),
      render: (orderNumber: string, record: Order) => (
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {orderNumber}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            ID: {record.id}
          </div>
        </div>
      ),
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
      render: (customerName: string, record: Order) => (
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {customerName}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {record.customerEmail}
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status: Order['status']) => (
        <Badge status={getStatusColor(status)} text={status} />
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      sorter: (a, b) => a.total - b.total,
      render: (total: number) => (
        <span className="text-sm text-gray-900 dark:text-white">
          ${total.toFixed(2)}
        </span>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (createdAt: string) => (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Button type="link" size="small" icon={<EyeOutlined />}>
          {t('view', { ns: 'common' })}
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('orders', { ns: 'menu' })}
        </h1>
        <div className="flex items-center gap-3">
          {selectedRowKeys.length > 0 && (
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={handleDeleteSelected}
            >
              {t('delete', { ns: 'common' })} ({selectedRowKeys.length})
            </Button>
          )}
          <Button type="primary" icon={<PlusOutlined />}>
            {t('add', { ns: 'common' })} Order
          </Button>
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          loading={loading}
          rowSelection={rowSelection}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} orders`,
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size || 10);
            },
            onShowSizeChange: (_, size) => {
              setCurrentPage(1);
              setPageSize(size);
            },
          }}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  );
};

export default Orders;
