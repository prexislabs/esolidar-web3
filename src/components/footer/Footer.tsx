import Icon from '@esolidar/toolkit/build/elements/icon';
import { FormattedMessage, useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import Dropdown from '@esolidar/toolkit/build/elements/dropdown';
import Button from '@esolidar/toolkit/build/elements/button';

const Footer = () => {
  const d = new Date();
  const year: number = d.getFullYear();
  const router = useRouter();
  const intl = useIntl();

  const locales = [
    { id: 'pt', name: 'Português' },
    { id: 'br', name: 'Português (BR)' },
    { id: 'en', name: 'English' },
  ];

  const handleChangeLang = (locale: string) => {
    router.push(router.pathname, router.pathname, { locale });
  };

  return (
    <div className="footer-component">
      <div className="footer-component__copyright">
        <FormattedMessage id="web3.copyright.note" />
      </div>

      <div className="footer-component__menu">
        <div>
          {intl.formatMessage(
            {
              id: 'web3.all.right.reserved',
            },
            { year }
          )}
        </div>
        <div className="footer-component__menu-item">
          <a
            href={`${process.env.NEXT_PUBLIC_ESOLIDAR_URL}policy`}
            target="_blank"
            rel="noreferrer"
          >
            <FormattedMessage id="web3.privacy.policy" />
          </a>
        </div>
        <div className="footer-component__menu-item">
          <a href={`${process.env.NEXT_PUBLIC_ESOLIDAR_URL}terms`} target="_blank" rel="noreferrer">
            <FormattedMessage id="web3.terms.conditions" />
          </a>
        </div>
        <div className="footer-component__menu-item">
          <a
            href={`${process.env.NEXT_PUBLIC_ESOLIDAR_URL}cookies`}
            target="_blank"
            rel="noreferrer"
          >
            <FormattedMessage id="web3.cookie.policy" />
          </a>
        </div>
        <div className="footer-component__menu-item-separator" />
        <div className="power-by-esolidar">
          Powered by <strong>esolidar</strong>
        </div>

        <div className="change-language">
          <div className="power-by-esolidar-mobile">
            Powered by <strong>esolidar</strong>
          </div>
          <div className="change-lang">
            <Icon name="Language" />
            <Dropdown
              customButton={
                <Button
                  extraClass="primary-full btn-change-lang"
                  ghost
                  iconRight={<Icon name="ChevronUp" />}
                  isLoading={false}
                  onClick={() => {}}
                  size="sm"
                  text={locales.find(i => i.id === router.locale)?.name}
                  theme="light"
                  type="button"
                  withLoading={false}
                />
              }
              items={[
                {
                  id: 0,
                  onClick: () => handleChangeLang('pt'),
                  text: 'Português',
                },
                {
                  id: 0,
                  onClick: () => handleChangeLang('br'),
                  text: 'Português (BR)',
                },
                {
                  id: 0,
                  onClick: () => handleChangeLang('en'),
                  text: 'English',
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;