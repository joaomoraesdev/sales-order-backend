type SalesReportByDaysProps = {
    salesOrderId: String;
    salesOrderAmount: Number;
    customerId: String;
    customerFullname: String;
};

export class SalesReportModel {
    constructor(private props: SalesReportByDaysProps) {}

    public static with(props: SalesReportByDaysProps): SalesReportModel {
        return new SalesReportModel(props);
    }

    public get salesOrderId() {
        return this.props.salesOrderId;
    }

    public get salesOrderAmount() {
        return this.props.salesOrderAmount;
    }

    public get customerId() {
        return this.props.customerId;
    }

    public get customerFullname() {
        return this.props.customerFullname;
    }
}
