import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import "./PurchasePage.css";
import products from "../products";

const PurchasePage = () => {
  const { id } = useParams();

  // Simulated API data
  const product = products.find((product) => product.id === id);

  // Function to download images
  const downloadImages = () => {
    product.images.forEach((img, index) => {
      const link = document.createElement("a");
      link.href = img;
      link.download = `HQ_Image_${index + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  // Function to generate improved invoice PDF
  const downloadInvoice = () => {
    const doc = new jsPDF();

    // Set font for title (bold and larger size)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Telemoni Invoice", 20, 20);
    
    // Add a line under the title for separation
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    // Add "Thank you" message
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text("Thank you for your purchase!", 20, 40);

    // Customer details
    doc.setFontSize(12);
    doc.text("Customer Name:", 20, 60);
    doc.setFont("helvetica", "bold");
    doc.text("Vijay Ravi", 80, 60);

    // Date and time
    const currentDate = new Date().toLocaleString();
    doc.setFont("helvetica", "normal");
    doc.text("Date & Time:", 20, 70);
    doc.setFont("helvetica", "bold");
    doc.text(currentDate, 80, 70);

    // Product details
    doc.setFont("helvetica", "normal");
    doc.text("Product Purchased:", 20, 90);
    doc.setFont("helvetica", "bold");
    doc.text(product.name, 80, 90);

    // Price details
    doc.setFont("helvetica", "normal");
    doc.text("Price:", 20, 100);
    doc.setFont("helvetica", "bold");
    doc.text(`$${product.price}`, 80, 100);

    // Add a footer with terms or a message if necessary
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Terms & Conditions: All sales are final.", 20, 150);

    // Save PDF
    doc.save("Invoice.pdf");
  };

  return (
    <div style={{height:'99vh'}} className="cart-page">
      <div className="cart-container">
        <h2>Download Your Purchase</h2>

        <div className="image-container">
          {product.images.map((img, index) => (
            <img key={index} src={img} alt={`HQ ${index}`} />
          ))}
        </div>

        <button className="download-button" onClick={downloadImages}>
          Download Images
        </button>
        <button className="invoice-button" onClick={downloadInvoice}>
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default PurchasePage;
