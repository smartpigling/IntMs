import React, { Component } from 'react';
import {
  Modal, Form, Input, DatePicker, Select, Button, Card,
  InputNumber, Radio, Icon, Tooltip, Row, Col,
} from 'antd';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@Form.create()
export default class ProjPlanForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleShowModal = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  handleHideModal = () => {
    this.setState({
      visible: false,
    });
  };

  handleOk = (e) => {
    e.preventDefault();
    const { onOk } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onOk(values);
        this.handleHideModal();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };


    return (
      <span>
        <span onClick={this.handleShowModal}>
          { children }
        </span>
        <Modal
          title="添加项目"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleHideModal}
          width="720"
        >
          <Form
            onSubmit={this.handleOk}
            hideRequiredMark
            layout="vertical"
          >
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label="test1">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入仓库名称' }],
                  })(
                    <Input placeholder="请输入仓库名称" />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label="test2">
                  {getFieldDecorator('url', {
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                      addonBefore="http://"
                      addonAfter=".com"
                      placeholder="请输入"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <FormItem
                  {...formItemLayout}
                  label="标题"
                >
                  {getFieldDecorator('title', {
                    rules: [{
                      required: true, message: '请输入标题',
                    }],
                  })(
                    <Input placeholder="给目标起个名字" />
                  )}
                </FormItem>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <FormItem
                  {...formItemLayout}
                  label="起止日期"
                >
                  {getFieldDecorator('date', {
                    rules: [{
                      required: true, message: '请选择起止日期',
                    }],
                  })(
                    <RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />
                  )}
                </FormItem>
              </Col>
            </Row>

            <FormItem
              {...formItemLayout}
              label="目标描述"
            >
              {getFieldDecorator('goal', {
                rules: [{
                  required: true, message: '请输入目标描述',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入你的阶段性工作目标" rows={4} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="衡量标准"
            >
              {getFieldDecorator('standard', {
                rules: [{
                  required: true, message: '请输入衡量标准',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入衡量标准" rows={4} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  客户
                  <em className={styles.optional}>
                    （选填）
                    <Tooltip title="目标的服务对象">
                      <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                    </Tooltip>
                  </em>
                </span>
              }
            >
              {getFieldDecorator('client')(
                <Input placeholder="请描述你服务的客户，内部客户直接 @姓名／工号" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span>邀评人<em className={styles.optional}>（选填）</em></span>}
            >
              {getFieldDecorator('invites')(
                <Input placeholder="请直接 @姓名／工号，最多可邀请 5 人" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span>权重<em className={styles.optional}>（选填）</em></span>}
            >
              {getFieldDecorator('weight')(
                <InputNumber placeholder="请输入" min={0} max={100} />
              )}
              <span>%</span>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="目标公开"
              help="客户、邀评人默认被分享"
            >
              <div>
                {getFieldDecorator('public', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">公开</Radio>
                    <Radio value="2">部分公开</Radio>
                    <Radio value="3">不公开</Radio>
                  </Radio.Group>
                )}
                {getFieldDecorator('publicUsers', {
                })(
                  <Select
                    mode="multiple"
                    placeholder="公开给"
                    style={{
                      margin: '8px 0',
                      display: getFieldValue('public') === '2' ? 'block' : 'none',
                    }}
                  >
                    <Option value="1">同事甲</Option>
                    <Option value="2">同事乙</Option>
                    <Option value="3">同事丙</Option>
                  </Select>
                )}
              </div>
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

