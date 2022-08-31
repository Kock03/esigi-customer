export class ContactPanelModel {
  id!: string;
  name!: string;
  office!: string;
  mail!: string;
  phoneNumber!: string;
  ddd!: string;
  ddi!: number;
  customerId!: string;

  constructor(contactPanel: any) {
    this.id = contactPanel.id
    this.name = contactPanel.name;
    this.office = contactPanel.office;
    this.mail = contactPanel.mail;
    this.phoneNumber = contactPanel.phone_number;
    this.ddd = contactPanel.ddd;
    this.ddi = contactPanel.ddi;
    this.customerId = contactPanel.customer_id;
  }
}
