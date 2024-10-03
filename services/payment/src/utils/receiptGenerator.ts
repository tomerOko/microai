// utils/receiptGenerator.ts

export const generateReceipt = (details: any): Buffer => {
    // Implement logic to generate a receipt (e.g., PDF generation)
    const receiptContent = `Receipt for ${JSON.stringify(details)}`;
    return Buffer.from(receiptContent);
  };
  