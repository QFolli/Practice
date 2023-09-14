import React, {useEffect,  useState} from 'react';
import {
  AppRoot,
  Search,
  SplitCol,
  ButtonGroup,
  PanelHeader,
  Header,
  Group,
  SimpleCell,
  ConfigProvider,
  Avatar,
  IconButton,
  Placeholder,
  Tabs,
  TabsItem,
  Spacing,
  InfoRow,
  Cell,
  WebviewType,
  ModalRoot,
  SplitLayout,
  SubnavigationBar,
  SubnavigationButton,
  CellButton,
  Button,
  Alert
} from '@vkontakte/vkui';
import {
  unstable_TextTooltip as TextTooltip,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {
  Icon24Add,
  Icon28AddOutline
} from '@vkontakte/icons';
import AddContact from './modals/AddContact';
import AddAddress from './modals/AddAddress';
import AddPhone from "./modals/AddPhone";

const TabsPanels = {
  INFO: 'info',
  ADDRESSES: 'addresses',
  PHONES: 'phones'
}

const Modals = {
  ADD_CONTACT: 'add-contact',
  ADD_ADDRESS: 'add-address',
  ADD_PHONE: 'add-phone'
}

const baseContact = {
  name: 'Павел Дуров',
  birthday: new Date(1974, 9, 10),
  email: 'mrpikokon@yandex.ru',
  groups: [
    {
      value: 'друзья',
      label: 'друзья'
    }
  ],
  phones: [
    {
      value: '777-45454',
      type: 'рабочий'
    }
  ],
  addresses: [
    {
      value: 'ОАЭ, Дубай, ул. Карла Либкнехта',
      type: 'дом'
    }
  ]
}

const App = () => {
  const [activeTab, setActiveTab] = useState(TabsPanels.INFO)
  const [activeModal, setActiveModal] = useState(null)
  const [activeGroup, setActiveGroup] = useState('все')
  const [popout, setPopout] = useState(null)
  const [contacts, setContacts] = useState([baseContact])
  const [currentContact, setCurrentContact] = useState(contacts[0])
  const [showedContacts, setShowedContacts] = useState(contacts)

  const modal = (
      <ModalRoot activeModal={activeModal} onClose={() => setActiveModal(null)}>
        <AddContact id={Modals.ADD_CONTACT} setActiveModal={setActiveModal} contacts={contacts} setContacts={setContacts}/>
        <AddAddress id={Modals.ADD_ADDRESS} setActiveModal={setActiveModal} contacts={contacts} setContacts={setContacts} currentContact={currentContact}/>
        <AddPhone id={Modals.ADD_PHONE} setActiveModal={setActiveModal} contacts={contacts} setContacts={setContacts} currentContact={currentContact}/>
      </ModalRoot>
  );

  const openConfirmDeleteAlert = () => {
    setPopout(
        <Alert
            actions={[
              {
                title: 'Отмена',
                autoClose: true,
                mode: 'cancel',
              },
              {
                title: 'Удалить',
                autoClose: true,
                mode: 'destructive',
                action: () => {
                  setContacts(contacts.filter(item => item !== currentContact))
                  setCurrentContact(null)
                  setActiveGroup('все')
                },
              },
            ]}
            actionsLayout='horizontal'
            onClose={() => setPopout(null)}
            header='Удаление контакта'
            text='Вы уверены, что хотите удалить этот контакт?'
        />,
    );
  }

  const injectInitials = (name) => {
    const firstName = name.slice(0, 1);

    if (name.indexOf(' ') === -1)
      return firstName;

    const lastName = name.slice(name.indexOf(' ') + 1, name.indexOf(' ') + 2);
    return `${firstName}${lastName}`;
  }

  useEffect(() => {
    setShowedContacts(contacts)
  }, [contacts])

  return (
      <ConfigProvider webviewType={WebviewType.INTERNAL}>
        <AppRoot>
          <SplitLayout header={<PanelHeader/>} centered modal={modal} style={{justifyContent: 'center'}}
                       popout={popout}>
            <SplitCol maxWidth={640} autoSpaced>
              <PanelHeader>Телефонная книга</PanelHeader>
              <Group>
                <Header mode='secondary'>Контакты</Header>

                <Search onChange={(e) => {
                  const query = e.target.value.toLowerCase()
                  setShowedContacts(contacts.filter(c => c.name.toLowerCase().includes(query)))
                }}/>

                <SubnavigationBar>
                  <SubnavigationButton
                      selected={activeGroup === 'все'}
                      onClick={() => {
                        setActiveGroup('все')
                        setShowedContacts(contacts)
                      }}
                      mode='tertiary'
                  >
                    все
                  </SubnavigationButton>

                  <SubnavigationButton
                      selected={activeGroup === 'семья'}
                      onClick={() => {
                        setActiveGroup('семья')
                        setShowedContacts(contacts.filter(c => c.groups.some(group => group.value === 'семья')))
                      }}
                      mode='tertiary'
                  >
                    семья
                  </SubnavigationButton>

                  <SubnavigationButton
                      selected={activeGroup === 'работа'}
                      onClick={() => {
                        setActiveGroup('работа')
                        setShowedContacts(contacts.filter(c => c.groups.some(group => group.value === 'работа')))
                      }}
                      mode='tertiary'
                  >
                    работа
                  </SubnavigationButton>

                  <SubnavigationButton
                      selected={activeGroup === 'друзья'}
                      onClick={() => {
                        setActiveGroup('друзья')
                        setShowedContacts(contacts.filter(c => c.groups.some(group => group.value === 'друзья')))
                      }}
                      mode='tertiary'
                  >
                    друзья
                  </SubnavigationButton>

                  <SubnavigationButton
                      selected={activeGroup === 'общие'}
                      onClick={() => {
                        setActiveGroup('общие')
                        setShowedContacts(contacts.filter(c => c.groups.some(group => group.value === 'общие')))
                      }}
                      mode='tertiary'
                  >
                    общие
                  </SubnavigationButton>
                </SubnavigationBar>

                {showedContacts.map((contact, index) =>
                    <SimpleCell
                        multiline
                        before={
                          <Avatar
                              initials={injectInitials(contact.name)}
                              gradientColor={1}
                          />
                        }
                        onClick={() => setCurrentContact(contact)}
                    >
                      {contact.name}
                    </SimpleCell>
                )}
              </Group>
            </SplitCol>

            <SplitCol maxWidth={420}>
              <PanelHeader
                  after={
                    <ButtonGroup gap='space'>
                      <IconButton onClick={() => setActiveModal(Modals.ADD_CONTACT)}>
                        <TextTooltip
                            text='Добавить контакт'
                            appearance='black'
                            hideDelay={0}
                            showDelay={0}
                        >
                          <Icon24Add/>
                        </TextTooltip>
                      </IconButton>
                    </ButtonGroup>
                  }
              />

              {currentContact !== null &&
                  <Group>
                    <Placeholder
                        header={currentContact.name}
                        action={
                          <Button mode='secondary' appearance='negative' onClick={openConfirmDeleteAlert}>Удалить</Button>
                        }
                    />

                    <Tabs>
                      <TabsItem selected={activeTab === TabsPanels.INFO} onClick={() => setActiveTab(TabsPanels.INFO)}>
                        Информация
                      </TabsItem>
                      <TabsItem selected={activeTab === TabsPanels.ADDRESSES}
                                onClick={() => setActiveTab(TabsPanels.ADDRESSES)}>
                        Адреса
                      </TabsItem>
                      <TabsItem selected={activeTab === TabsPanels.PHONES}
                                onClick={() => setActiveTab(TabsPanels.PHONES)}>
                        Телефоны
                      </TabsItem>
                    </Tabs>

                    <Spacing/>

                    {activeTab === TabsPanels.INFO &&
                        <>
                          {
                              currentContact.birthday && (
                                  <SimpleCell>
                                    <InfoRow header='Дата рождения'>
                                      {`${currentContact.birthday.getDate()}.${currentContact.birthday.getMonth() + 1}.${currentContact.birthday.getFullYear()}`}
                                    </InfoRow>
                                  </SimpleCell>
                              )
                          }

                          {
                              currentContact.email && (
                                  <SimpleCell>
                                    <InfoRow header='Email'>{currentContact.email}</InfoRow>
                                  </SimpleCell>
                              )
                          }

                          {
                              currentContact.groups.length !== 0 && (
                                  <SimpleCell multiline>
                                    <InfoRow
                                        header='Группы'>{currentContact.groups.map(item => item.value).join(', ')}</InfoRow>
                                  </SimpleCell>
                              )
                          }
                        </>
                    }

                    {activeTab === TabsPanels.ADDRESSES && (
                        <>
                          {currentContact.addresses.map((address, index) => (
                              <Cell
                                  key={index}
                                  mode='removable'
                                  subtitle={address.type}
                                  onRemove={() => {
                                    const updatedAddresses = [...currentContact.addresses];
                                    updatedAddresses.splice(index, 1);
                                    setCurrentContact({ ...currentContact, addresses: updatedAddresses });
                                  }}
                              >
                                {address.value}
                              </Cell>
                          ))}

                          <CellButton centered before={<Icon28AddOutline/>}
                                      onClick={() => setActiveModal(Modals.ADD_ADDRESS)}>
                            Добавить адрес
                          </CellButton>
                        </>
                    )}

                    {activeTab === TabsPanels.PHONES &&
                        <>
                          {currentContact.phones.map((phone, index) => (
                              <Cell
                                  key={index}
                                  mode='removable'
                                  subtitle={phone.type}
                                  onRemove={() => {
                                    const updatedPhones = [...currentContact.phones];
                                    updatedPhones.splice(index, 1);
                                    setCurrentContact({ ...currentContact, phones: updatedPhones });
                                  }}
                              >
                                {phone.value}
                              </Cell>
                          ))}

                          <CellButton centered before={<Icon28AddOutline/>}
                                      onClick={() => setActiveModal(Modals.ADD_PHONE)}>
                            Добавить телефон
                          </CellButton>
                        </>
                    }
                  </Group>
              }
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </ConfigProvider>
  );
};

export default App;