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
import React, {useState} from "react";
import {
    Icon24Done
} from '@vkontakte/icons';

const AddAddress = ({id, setActiveModal, contacts, setContacts, currentContact}) => {
    const [address, setAddress] = useState(null)
    const [addressType, setAddressType] = useState(null)

    const addAddress = () => {
        currentContact.addresses.push({ value: address.target.value, type: addressType.target.value })
        setActiveModal(null)
    }

    return (
        <ModalPage id={id} onClose={() => setActiveModal(null)}>
            <ModalPageHeader
                after={
                    <PanelHeaderButton>
                        <Icon24Done onClick={addAddress}/>
                    </PanelHeaderButton>
                }
            >
                Добавление адреса
            </ModalPageHeader>

            <Group>
                <FormLayout>
                    <FormItem top='Адрес' value={address} onInput={setAddress}>
                        <Input maxLength={255}/>
                    </FormItem>

                    <FormItem top='Тип' value={addressType} onChange={setAddressType}>
                        <CustomSelect
                            placeholder='Выберите или введите тип'
                            searchable
                            options={[
                                { label: 'дом', value: 'дом' },
                                { label: 'работа', value: 'работа' }
                            ]}
                        />
                    </FormItem>
                </FormLayout>
            </Group>
        </ModalPage>
    );
}

export default AddAddress;