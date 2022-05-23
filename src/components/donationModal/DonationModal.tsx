/* eslint-disable no-use-before-define */
import React, { FC, useEffect, useState } from 'react';
import { IntlShape, useIntl, FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import CustomModal from '@esolidar/toolkit/build/elements/customModal';
import Button from '@esolidar/toolkit/build/elements/button';
import Icon from '@esolidar/toolkit/build/elements/icon';
import TextFieldNumber from '@esolidar/toolkit/build/elements/textFieldNumber';
import useToast from '../../hooks/useToast/useToast';
import Props, { ModalBodyProps, Form } from './DonationModal.types';

const DEFAULT_FORM: Form = {
  amount: null,
  errors: null,
};

const DonationModal: FC<Props> = ({
  openModal,
  balance,
  nonProfitName,
  onCloseModal,
  onclickDonate,
}: Props) => {
  const [form, setForm] = useState<Form>(DEFAULT_FORM);
  const [isDonateLoading, setIsDonateLoading] = useState<boolean>(false);

  const intl: IntlShape = useIntl();
  const toast = useToast();

  const modalTitle = intl.formatMessage({ id: 'web3.donateModal.to' }, { nonProfitName });

  const resetModal = () => {
    setIsDonateLoading(false);
    const funds = balance || 0;
    if (+funds === 0) {
      const newForm: Form = { ...form };
      newForm.amount = null;
      newForm.errors = { amount: intl.formatMessage({ id: 'web3.donateModal.no.balance' }) };
      setForm(newForm);
    } else {
      setForm(DEFAULT_FORM);
    }
  };

  useEffect(() => {
    resetModal();
  }, [openModal]);

  const handleChangeForm = ({ value }: any) => {
    const funds = balance || 0;
    const newForm: Form = { ...form };
    let newValue: any = null;
    if (value && funds > 0) {
      if (balance && newValue >= +balance) {
        newValue = balance;
      }
      newValue = +value;
      newForm.errors = null;
    }
    newForm.amount = newValue;
    setForm(newForm);
  };

  const handleClickDonate = () => {
    if (form.amount && form.amount > 0 && balance && balance > 0) {
      setIsDonateLoading(true);
      onclickDonate(form).then((value: any) => {
        if (value) {
          setIsDonateLoading(false);
          toast.error(intl.formatMessage({ id: 'web3.error.alert' }));
          setForm({ amount: null, errors: { transaction: true } });
        }
      });
    }
  };

  return (
    <CustomModal
      show={openModal}
      onHide={onCloseModal}
      size="md"
      title={modalTitle.length >= 70 ? `${modalTitle.slice(0, 70)}...` : modalTitle}
      dialogClassName="donationModal"
      backdrop="static"
      bodyChildren={
        <ModalBody
          balance={balance}
          form={form}
          onChangeForm={handleChangeForm}
          onClickShortcut={handleChangeForm}
          isDonateLoading={isDonateLoading}
        />
      }
      actionsChildren={
        <>
          <Button
            className={classnames('donationModal__button-disabled', { isLoadind: isDonateLoading })}
            extraClass={classnames({
              'primary-full': form.amount || isDonateLoading,
            })}
            size="md"
            text={intl.formatMessage({ id: 'web3.donate' })}
            onClick={handleClickDonate}
            withLoading
            isLoading={isDonateLoading}
            disabled={!form.amount || form.amount === 0}
            fullWidth
          />
          {form.errors?.transaction && (
            <span className="donationModal__error">
              <FormattedMessage
                id="web3.error.alert"
                // TODO: link to faqs (waiting for product team)
                // values={{
                //   a: chunks => (
                //     <a
                //       target="_blank"
                //       rel="noreferrer"
                //       href={`https://faqs${locale !== 'en' ? '/pt' : ''}/xpto`}
                //     >
                //       {chunks}
                //     </a>
                //   ),
                // }}
              />
            </span>
          )}
        </>
      }
    />
  );
};

export default DonationModal;

const ModalBody: FC<ModalBodyProps> = ({
  balance,
  form = DEFAULT_FORM,
  shortcuts = [25, 50, 150, 500],
  onChangeForm,
  onClickShortcut,
  isDonateLoading,
}: ModalBodyProps) => {
  const intl: IntlShape = useIntl();

  const { amount, errors } = form;

  return (
    <div className="donationModal__body">
      <div className="donationModal__subtitle">
        {intl.formatMessage({ id: 'web3.donateModal.subtitle' })}
      </div>
      <div className="donationModal__balance">
        <div className="donationModal__balance-coin">
          <Button className="cusd-icon" icon={<Icon name="AtSign" />} type="icon" theme="light" />
          <span>cUSD balance</span>
        </div>
        <div className="donationModal__balance-value">{balance} cUSD</div>
      </div>
      <div className="donationModal__amount">
        <TextFieldNumber
          field="amount"
          id="amount"
          suffix=" cUSD"
          thousandSeparator
          label={intl.formatMessage({ id: 'web3.donateModal.amount' })}
          decimalScale={18}
          placeholder="0.00 cUSD"
          value={amount}
          onChange={(e: any) => onChangeForm(e)}
          error={errors?.amount}
          dataTestId="amount"
          allowNegative={false}
          disabled={isDonateLoading || errors?.amount}
        />
      </div>
      <div className="donationModal__shortcuts">
        <span>{intl.formatMessage({ id: 'web3.donateModal.shortcuts' })}</span>
        <div className="donationModal__shortcuts-list">
          {shortcuts.map(val => (
            <Button
              onClick={() => onClickShortcut({ value: val })}
              className={classnames('donationModal__shortcuts-item', { active: amount === val })}
              text={
                <div>
                  {val} <span>cUSD</span>
                </div>
              }
              ghost
              theme="light"
              key={val}
              disabled={isDonateLoading}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
