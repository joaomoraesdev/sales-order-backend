type CustomerProps = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export class CustomerModel {
    constructor(private props: CustomerProps) { }

    public static create(props: CustomerProps): CustomerModel {
        return new CustomerModel(props);
    }

    public get id() {
        return this.props.id;
    }

    public set id(value: string) {
        this.props.id = value;
    }

    public get firstName() {
        return this.props.firstName;
    }

    public set firstName(value: string) {
        this.props.firstName = value;
    }

    public get lastName() {
        return this.props.lastName;
    }

    public set lastName(value: string) {
        this.props.lastName = value;
    }

    public get email() {
        return this.props.email;
    }

    public set email(value: string) {
        this.props.email = value;
    }

    public setDefaultEmailDomain(): CustomerModel {
        if (!this.props.email?.includes('@')) {
            this.props.email = `${this.props.email}@hotmail.com`;
        }
        return this;
    }

    public toObject(): CustomerProps {
        return {
            id: this.props.id,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            email: this.props.email
        }
    }
}