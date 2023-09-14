import {
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    Group,
    FormItem,
    Input,
    FormLayout,
    CustomSelect
} from '@vkontakte/vkui';
import React, {useState} from 'react';
import {
    Icon24Done
} from '@vkontakte/icons';

const AddPhone = ({id, setActiveModal, contacts, setContacts, currentContact}) => {
    const [phone, setPhone] = useState(null)
    const [phoneType, setPhoneType] = useState(null)

    const addPhone = () => {
        currentContact.phones.push({ value: phone.target.value, type: phoneType.target.value })
        setActiveModal(null)
    }

    return (
        <ModalPage id={id} onClose={() => setActiveModal(null)}>
            <ModalPageHeader
                after={
                    <PanelHeaderButton>
                        <Icon24Done onClick={addPhone}/>
                    </PanelHeaderButton>
                }
            >
                Добавление телефона
            </ModalPageHeader>

            <Group>
                <FormLayout>
                    <FormItem top='Телефон' value={phone} onInput={setPhone}>
                        <Input maxLength={30}/>
                    </FormItem>

                    <FormItem top='Категория' value={phoneType} onChange={setPhoneType}>
                        <CustomSelect placeholder='Выберите или введите категорию' searchable options={[
                            { label: 'домашний', value: 'домашний' },
                            { label: 'рабочий', value: 'рабочий' },
                            { label: 'мобильный', value: 'мобильный' }
                        ]}/>
                    </FormItem>
                </FormLayout>
            </Group>
        </ModalPage>
    );
}

export default AddPhone;