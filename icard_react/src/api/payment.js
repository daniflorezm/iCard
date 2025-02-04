import { BASE_API, PAYMENT_STATUS } from "../utils/constants"

export async function createPaymentApi(paymentData) {
    try {
        const URL = `${BASE_API}/api/payments/`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData)
        }
        const response = await fetch(URL, params)
        const result = await response.json()
        return result
    } catch (error) {
        throw error;
    }
}

export async function getPaymentByTableApi(idTable) {
    try {
        const tableFilter = `table=${idTable}`;
        const statusFilter = `statusPayment=${PAYMENT_STATUS.PENDING}`;
        const URL = `${BASE_API}/api/payments/?${tableFilter}&${statusFilter}`
        const params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(URL, params)
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}
export async function closePaymentApi(idPayment) {
    try {
        const URL = `${BASE_API}/api/payments/${idPayment}/`
        const params = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ statusPayment: PAYMENT_STATUS.PAID })
        }
        const response = await fetch(URL, params)
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}
export async function getPaymentsApi() {
    try {
        const paymentFilter = `statusPayment=${PAYMENT_STATUS.PAID}`;
        const orderingFilter = `ordering=created_at`;
        const URL = `${BASE_API}/api/payments/?${paymentFilter}&${orderingFilter}`
        const response = await fetch(URL);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}