type SalesReportByDaysProps = {
    salesOrderId: string;
    salesOrderTotalAmount: number;
    customerId: string;
    customerFullname: string;
};

export class SalesReportModel {
    constructor(private props: SalesReportByDaysProps) {}

    public static with(props: SalesReportByDaysProps): SalesReportModel {
        return new SalesReportModel(props);
    }

    public get salesOrderId() {
        return this.props.salesOrderId;
    }

    public get salesOrderTotalAmount() {
        return this.props.salesOrderTotalAmount;
    }

    public get customerId() {
        return this.props.customerId;
    }

    public get customerFullname() {
        return this.props.customerFullname;
    }

    public toObject(): SalesReportByDaysProps {
        return {
            salesOrderId: this.props.salesOrderId,
            salesOrderTotalAmount: this.props.salesOrderTotalAmount,
            customerId: this.props.customerId,
            customerFullname: this.props.customerFullname
        };
    }
}
