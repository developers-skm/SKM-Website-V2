import products, { getProductById } from '../../../data/products';

// Step 4 — Review and submit (brief §2, Step 4). Shows exactly what was
// entered in Steps 1–3 — real form state, nothing invented — so the
// visitor can verify before the real "Submit Enquiry" action.
function ReviewRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-surface-100 last:border-b-0">
      <span className="font-body text-[12px] font-semibold uppercase tracking-wide text-surface-400 flex-shrink-0">{label}</span>
      <span className="font-body text-[13.5px] text-surface-800 text-right">{value}</span>
    </div>
  );
}

export default function StepReview({ formData }) {
  const product = getProductById(formData.productId);
  const isSampleCart = (formData.sampleProductIds?.length ?? 0) > 0;
  const sampleProductTitles = isSampleCart
    ? products
        .filter((p) => formData.sampleProductIds.includes(p.id))
        .map((p) => p.title)
        .join(', ')
    : '';

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading m-0 tracking-tight">
          Review your enquiry
        </h2>
        <p className="font-body text-[13.5px] text-surface-500 m-0">
          Check the details below, then submit — you can go back to change anything first.
        </p>
      </div>

      <div className="rounded-[14px] border border-[#eee] bg-white px-5 sm:px-6 py-2">
        {isSampleCart ? (
          <ReviewRow label="Products" value={sampleProductTitles} />
        ) : (
          <ReviewRow label="Product" value={product?.title} />
        )}
        <ReviewRow label="Functional Requirement" value={formData.functionalRequirement} />
        <ReviewRow label="Product Type" value={formData.productType === 'standard' ? 'Standard' : formData.productType ? 'Custom' : ''} />
        <ReviewRow label="Estimated Volume" value={formData.quantity} />
        <ReviewRow label="Packaging" value={formData.packaging} />
        <ReviewRow label="Destination Country" value={formData.country} />
        <ReviewRow label="Required Delivery" value={formData.deliveryDate} />
        <ReviewRow label="Name" value={[formData.firstName, formData.lastName].filter(Boolean).join(' ')} />
        <ReviewRow label="Company" value={formData.company} />
        <ReviewRow label="Job Role" value={formData.jobRole} />
        <ReviewRow label="Email" value={formData.email} />
        <ReviewRow label="Phone" value={formData.phone} />
        <ReviewRow label="Message" value={formData.message} />
      </div>
    </div>
  );
}
