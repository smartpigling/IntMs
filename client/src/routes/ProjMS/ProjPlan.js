import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Popconfirm, List, Card, Row, Col, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ProjPlanForm from '../../components/ProjMS/ProjPlanForm';
import styles from './ProjPlan.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(state => ({
  list: state.list,
}))
export default class ProjPlan extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  }

  handleCreate(values) {
    console.log(values);
    // this.props.dispatch({
    //   type: 'proj/create',
    //   payload: values,
    // });
  }

  handleEdit(id, values) {
    console.log(id, values);
    // this.props.dispatch({
    //   type: '',
    //   payload:{ id, values },
    // });
  }

  handleRemove(id) {
    console.log(id);
    // this.props.dispatch({
    //   type: 'proj/remove',
    //   payload: id,
    // });
  }

  render() {
    const { list: { list, loading } } = this.props;

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">进行中</RadioButton>
          <RadioButton value="waiting">已完成</RadioButton>
        </RadioGroup>
        <Search
          className={styles.extraContentSearch}
          placeholder="请输入"
          onSearch={() => ({})}
        />
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
      <div className={styles.listContent}>
        <div>
          <span>Owner</span>
          <p>{owner}</p>
        </div>
        <div>
          <span>开始时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD hh:mm')}</p>
        </div>
        <div>
          <Progress percent={percent} status={status} strokeWidth={6} />
        </div>
      </div>
    );


    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="未完成" value="2个" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="已完成" value="22个" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="当月总任务" value="24个" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="项目列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <ProjPlanForm record={{}} onOk={() => this.handleCreate}>
              <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus">
                添加
              </Button>
            </ProjPlanForm>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  actions={[
                    <ProjPlanForm record={item} onOk={() => this.handleEdit(item.id)}>
                      <a>修改</a>
                    </ProjPlanForm>,
                    <Popconfirm title="是否要删除此行？" onConfirm={() => this.handleRemove(item.id)}>
                      <a>删除</a>
                    </Popconfirm>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.logo} shape="square" size="large" />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.subDescription}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
