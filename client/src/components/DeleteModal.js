import React, { useState } from 'react';
import contactService from '../services/contacts';
import { useMediaQuery } from 'react-responsive';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const DeleteModal = ({
  type,
  contacts,
  setContacts,
  contact,
  id,
  urlId,
  urlLink,
  urlName,
  notify,
}) => {
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleContactDelete = async () => {
    try {
      await contactService.deleteContact(id);
      setContacts(contacts.filter((c) => c.id !== id));
      notify(`Contact '${contact.name}' deleted!`, 'green');
    } catch (error) {
      console.error(error.message);
      notify(`${error.message}`, 'red');
    }
  };

  const handleLinkDelete = async () => {
    const targetContact = contacts.find((c) => c.id === id);
    const updatedContactsKey = targetContact.contacts.filter(
      (t) => t.id !== urlId
    );
    const updatedContact = { ...targetContact, contacts: updatedContactsKey };

    console.log(id, urlId);

    try {
      await contactService.deleteLink(id, urlId);
      setContacts(contacts.map((c) => (c.id !== id ? c : updatedContact)));
      notify(`${urlName} link '${urlLink}' deleted!`, 'green');
    } catch (error) {
      console.error(error.message);
      notify(`${error.message}`, 'red');
    }
  };

  const isTypeContact = type === 'contact';

  return (
    <Modal
      closeIcon
      open={open}
      trigger={
        <Button
          content={
            isTypeContact ? (isMobile ? undefined : 'Delete') : undefined
          }
          icon={isTypeContact ? 'user delete' : 'delete'}
          color={isTypeContact ? 'red' : ''}
          size={isTypeContact ? (isMobile ? 'mini' : 'medium') : 'tiny'}
          className={isTypeContact ? 'contact-del-btn' : 'delete-btn'}
          floated={isTypeContact ? '' : 'right'}
          compact
        />
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="trash alternate" content="Confirm Delete" />
      <Modal.Content>
        <p>
          {isTypeContact
            ? `Are you sure want to delete contact named as '${contact.name}'?`
            : `Are you sure want to delete ${urlName} link '${urlLink}'?`}
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button
          color="green"
          onClick={isTypeContact ? handleContactDelete : handleLinkDelete}
        >
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteModal;
