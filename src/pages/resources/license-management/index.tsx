import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Table, Button, Badge, Tag, Progress } from '@/components/ui';
import type { TableProps } from '@/components/ui';
import { PlusOutlined, DeleteOutlined, EyeOutlined, EditOutlined, ReloadOutlined } from '@ant-design/icons';
import { getLicenses, License } from '@/mocks/licenses';

const LicenseManagement = () => {
  const { t } = useTranslation(['licenses', 'common']);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        setLoading(true);
        const response = await getLicenses(currentPage, pageSize);
        setLicenses(response.data.items);
        setTotal(response.data.total);
      } catch (error) {
        console.error('Failed to fetch licenses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLicenses();
  }, [currentPage, pageSize]);

  const getStatusColor = (status: License['status']) => {
    const colors = {
      active: 'success',
      expired: 'error',
      suspended: 'warning',
      pending: 'processing',
      revoked: 'default'
    } as const;
    return colors[status] || 'default';
  };

  const getTypeColor = (type: License['type']) => {
    const colors = {
      standard: 'blue',
      premium: 'purple',
      enterprise: 'gold',
      trial: 'green'
    } as const;
    return colors[type] || 'default';
  };

  const handleDeleteSelected = () => {
    console.log('Delete selected licenses:', selectedRowKeys);
    setSelectedRowKeys([]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const columns: TableProps<License>['columns'] = [
    {
      title: t('columns.licenseKey', { ns: 'licenses' }),
      dataIndex: 'licenseKey',
      key: 'licenseKey',
      render: (licenseKey: string, record: License) => (
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-white font-mono">
            {licenseKey}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            ID: {record.id}
          </div>
        </div>
      ),
    },
    {
      title: t('columns.product', { ns: 'licenses' }),
      dataIndex: 'productName',
      key: 'productName',
      sorter: (a, b) => a.productName.localeCompare(b.productName),
      render: (productName: string, record: License) => (
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {productName}
          </div>
          <Tag color={getTypeColor(record.type)}>
            {t(`type.${record.type}`, { ns: 'licenses' })}
          </Tag>
        </div>
      ),
    },
    {
      title: t('columns.customer', { ns: 'licenses' }),
      dataIndex: 'customerName',
      key: 'customerName',
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
      render: (customerName: string, record: License) => (
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
      title: t('columns.status', { ns: 'licenses' }),
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status: License['status']) => (
        <Badge
          status={getStatusColor(status)}
          text={t(`status.${status}`, { ns: 'licenses' })}
        />
      ),
    },
    {
      title: t('columns.users', { ns: 'licenses' }),
      dataIndex: 'currentUsers',
      key: 'users',
      sorter: (a, b) => (a.currentUsers / a.maxUsers) - (b.currentUsers / b.maxUsers),
      render: (currentUsers: number, record: License) => {
        const percentage = (currentUsers / record.maxUsers) * 100;
        return (
          <div className="w-24">
            <div className="text-sm text-gray-900 dark:text-white mb-1">
              {currentUsers}/{record.maxUsers}
            </div>
            <Progress
              percent={percentage}
              size="small"
              status={percentage > 90 ? 'exception' : percentage > 70 ? 'active' : 'success'}
              showInfo={false}
            />
          </div>
        );
      },
    },
    {
      title: t('columns.expiry', { ns: 'licenses' }),
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      sorter: (a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime(),
      render: (expiryDate: string) => {
        const daysUntilExpiry = getDaysUntilExpiry(expiryDate);
        const isExpiringSoon = daysUntilExpiry <= 30 && daysUntilExpiry > 0;
        const isExpired = daysUntilExpiry <= 0;

        let textColor = 'text-gray-900 dark:text-white';
        if (isExpired) textColor = 'text-red-600';
        else if (isExpiringSoon) textColor = 'text-orange-600';

        return (
          <div>
            <div className={`text-sm ${textColor}`}>
              {new Date(expiryDate).toLocaleDateString()}
            </div>
            {isExpiringSoon && (
              <div className="text-xs text-orange-600">
                {daysUntilExpiry} days left
              </div>
            )}
            {isExpired && (
              <div className="text-xs text-red-600">
                Expired {Math.abs(daysUntilExpiry)} days ago
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: t('columns.price', { ns: 'licenses' }),
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price: number) => (
        <span className="text-sm text-gray-900 dark:text-white font-medium">
          ${price.toFixed(2)}
        </span>
      ),
    },
    {
      title: t('columns.actions', { ns: 'licenses' }),
      key: 'actions',
      render: (_, record: License) => (
        <div className="flex items-center gap-2">
          <Button type="link" size="small" icon={<EyeOutlined />}>
            {t('viewLicense', { ns: 'licenses' })}
          </Button>
          <Button type="link" size="small" icon={<EditOutlined />}>
            {t('editLicense', { ns: 'licenses' })}
          </Button>
          {record.status === 'active' && (
            <Button type="link" size="small" icon={<ReloadOutlined />}>
              {t('renewLicense', { ns: 'licenses' })}
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('licenseManagement', { ns: 'menu' })}
        </h1>
        <div className="flex items-center gap-3">
          {selectedRowKeys.length > 0 && (
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={handleDeleteSelected}
            >
              {t('deleteLicenses', { ns: 'licenses' })} ({selectedRowKeys.length})
            </Button>
          )}
          <Button type="primary" icon={<PlusOutlined />}>
            {t('addLicense', { ns: 'licenses' })}
          </Button>
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={licenses}
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
              `${range[0]}-${range[1]} of ${total} licenses`,
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size || 10);
            },
            onShowSizeChange: (_, size) => {
              setCurrentPage(1);
              setPageSize(size);
            },
          }}
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  );
};

export default LicenseManagement;
