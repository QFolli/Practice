import {
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    Group,
    FormItem,
    Input,
    FormLayout,
    Card,
    DateInput
} from '@vkontakte/vkui';
import React, {useState} from 'react';
import {
    Icon24Done
} from '@vkontakte/icons';
import { unstable_ChipsSelect as ChipsSelect } from '@vkontakte/vkui';

const AddContact = ({id, setActiveModal, contacts, setContacts}) => {
    const [name, setName] = useState()
    const [birthday, setBirthday] = useState(null)
    const [email, setEmail] = useState(null)
    const [groups, setGroups] = useState([])

    const addContact = () => {
        const newContact = {
            name: name.target.value,
            birthday: birthday,
            email: email === null ? 'нет' : email.target.value,
            groups: groups,
            phones: [],
            addresses: []
        }
        setContacts([...contacts, newContact])
        setActiveModal(null)
    }

    return (
        <ModalPage id={id} onClose={() => setActiveModal(null)}>
            <ModalPageHeader
                after={
                    <PanelHeaderButton>
                        <Icon24Done onClick={addContact}/>
                    </PanelHeaderButton>
                }
            >
                Новый контакт
            </ModalPageHeader>

            <Group>
                <FormLayout>
                    <Card style={{backgroundColor: 'transparent'}}>
                        <FormItem top='ФИО (обязательно)' style={{paddingRight: 6}} value={name} onChange={setName}>
                            <Input type='text' placeholder='ФИО' maxLength={20}/>
                        </FormItem>
                    </Card>
                    <FormItem top='Дата рождения'>
                        <DateInput
                            value={birthday}
                            onChange={setBirthday}
                            enableTime={false}
                            disablePast={true}
                            disableFuture={true}
                            closeOnChange={true}
                            disablePickers={false}
                            showNeighboringMonth={true}
                            disableCalendar={false}
                        />
                    </FormItem>

                    <FormItem top='Email' value={email} onChange={setEmail}>
                        <Input type='text' placeholder='Email' maxLength={100}/>
                    </FormItem>

                    <FormItem top='Группы'>
                        <ChipsSelect value={groups} onChange={setGroups} creatable={false} options={[
                            { value: 'семья', label: 'семья' },
                            { value: 'работа', label: 'работа' },
                            { value: 'друзья', label: 'друзья' },
                            { value: 'общие', label: 'общие' },
                        ]}/>
                    </FormItem>
                </FormLayout>
            </Group>
        </ModalPage>
    );
}

export default AddContact;