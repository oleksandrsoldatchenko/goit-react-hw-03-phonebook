import { Component } from 'react';

import Container from './components/Container';
import ContactForm from './components/ContactForm';

import Filter from './components/Filter';
import ContactList from './components/ContactList';

import styles from './App.module.scss';

class App extends Component {
  // Стейт з базовими даними відповідно до завдання
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    // Початкове заповнення поля Find contacts by name
    filter: '',
  };

  // Метод, що додає контакт
  addContact = newContact => {
    // Перевірка на дублювання
    const duplicateName = this.state.contacts.find(
      contact => contact.name === newContact.name
    );

    if (duplicateName) {
      alert(`${newContact.name} is already on contacts`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  // Метод, що спостерігає за полем фільтрації і пише в стейт
  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  // Метод для фільтрування контактів по введеним у полі пошука і повернення результату фільтру
  filterContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // Метод для видалення контакту
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredResults = this.filterContacts();

    return (
      <Container>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2 className={styles.title}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filteredResults}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;