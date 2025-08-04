<template>
  <div class="container mx-auto px-4 py-8 w-full">
    <div class="flex flex-col md:flex-row md:flex-nowrap items-center justify-between gap-2">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <div class="flex text-sm gap-2">
        <p>Welcome <strong>Admin!</strong> </p>
        <button @click="logout" class="btn btn-primary btn-xs btn-outline">Logout</button>
      </div>
    </div>

    <div class="flex gap-4 items-stretch w-full justify-end">
      <div class="stats shadow mt-2 mb-4">
        <div class="stat">
          <div class="stat-title">Counts by Status</div>
          <div class="stat-value font-medium text-center">{{ statusCounts }}</div>
          <div class="stat-desc text-end mt-2">
            <select class="select select-neutral select-bordered select-xs w-full" v-model="defaultStatStatus">
              <option value="attempted">Attempted</option>
              <option value="captured">Captured</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
              <option value="refunded">Refunded</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          </div>
      </div>

      <div class="stats shadow mt-2 mb-4">
        <div class="stat">
          <div class="stat-title">Total Collections</div>
          <div class="stat-value font-medium">MYR {{ totalCollections.toFixed(2) }}</div> <!-- compute total amount in MYR for the whole amount column -->
          <div class="stat-desc">from {{ completedRegistrants }} registrants</div> <!-- display total length of registration array -->
        </div>
      </div>
    </div>

    <div class="overflow-x-auto mt-6">
      <table class="table table-zebra-zebra w-full text-sm">
        <!-- Table Header -->
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Bill Name (Email)</th>
            <th>Payment Method</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <!-- Table Body -->
        <tbody>
          <tr v-for="item in paginatedItems" :key="item.order_id">
            <td>{{ item.order_id }}</td>
            <td>{{ item.bill_name }} ({{ item.bill_email }})</td>
            <td>{{ formatCamelCase(item.paymentMethod) }}</td>
            <td>{{ item.currency }}{{ item.amount.toFixed(2) }}</td>
            <td class="capitalize">
              <span class="cursor-pointer hover:brightness-110" :class="statusClass(item.status)" @click="filterByStatusBadge(item.status)">{{ item.status }}
                <span v-if="selectedStatusFilter === item.status" @click.stop="clearStatusFilter" class="ml-1 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg></span>
              </span>
            </td>
            <td><button class="btn btn-sm btn-link rounded-badge" @click="showDetails(item)">Details</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-6">
      <div class="text-sm">
        Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, items.length) }} of {{ items.length }} entries
      </div>
      <div class="btn-group join">
        <button class="join-item btn btn-ghost btn-xs" :disabled="currentPage === 1" @click="currentPage--">«</button>
        <button class="join-item btn btn-ghost btn-xs" v-for="page in totalPages" :key="page" :class="{ 'btn-active': currentPage === page }" @click="currentPage = page">{{ page }}</button>
        <button class="join-item btn btn-ghost btn-xs" :disabled="currentPage === totalPages" @click="currentPage++">»</button>
      </div>
    </div>

    <!-- Modal for displaying details -->
    <div v-if="showModal" class="modal modal-open" @click="closeModal">
      <div class="modal-box w-11/12 max-w-5xl rounded-md text-sm" @click.stop>
        <h3 class="font-bold text-lg mb-4">Full Details</h3>
        <div class="flex flex-col md:flex-row gap-2 md:gap-4">
          <!-- left -->
          <div class="basis-12/12 md:basis-9/12">
            <h3 class="font-semibold">Payee's Details</h3>
            <ul class="grid grid-cols-2">
              <li class="font-bold">Order ID: {{ selectedDetail.order_id }}</li>
              <li class="capitalize">Status: <span :class="statusClass(selectedDetail.status)">{{ selectedDetail.status }}</span></li>
              <li>Name: {{ selectedDetail.bill_name }} ({{ selectedDetail.bill_email }})</li>
              <li>Name on badge: {{ selectedDetail.preferredName }}</li>
              <li>Address: {{ selectedDetail.address }}</li>
              <li>Mobile Number: {{ selectedDetail.mobile_number }}</li>
              <li>Membership: {{ selectedDetail.isStudent ? 'Student' : formatCamelCase(selectedDetail.membership) }}</li>
              <li>Category: {{ selectedDetail.category }}</li>
              <li>Dietary Restriction: {{ selectedDetail.dietaryRestriction }}</li>
              <li class="font-semibold">TOTAL: {{ selectedDetail.currency }} {{ selectedDetail.amount.toFixed(2) }}</li>
            </ul>
          </div>
          <!-- right -->
          <div class="basis-12/12 md:basis-3/12">
            <h3 class="font-semibold">Actions</h3>
            <select class="select select-sm select-bordered w-full max-w-xs" v-model="selectedDetail.status">
              <option disabled="disabled">Change Status</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
              <option value="Pending Payment">Pending Payment</option>
              <option value="captured">Captured</option>
              <option value="attempted">Attempted</option>
              <option value="Refund Requested">Refund Requested</option>
              <option value="Refunded">Refunded</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div class="join mt-4">
              <button class="btn btn-sm btn-neutral btn-outline join-item" @click="saveStatusChange" disabled>Save Changes✔️</button>
              <button class="btn btn-sm btn-neutral btn-outline join-item" @click="cancelStatusChange">Cancel❌</button>
            </div>
          </div>
        </div>
        <hr class="my-4"/>
        <h3 class="font-semibold">Items</h3>
        <table class="table table-zebra w-full text-sm">
          <thead>
            <tr>
              <th>Description</th>
              <th class="text-right">Prices</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in parsedItems" :key="index">
              <td class="capitalize">{{ formatCamelCase(item.type) }} {{ item.name ? `- ${item.name}` : '' }}</td>
              <td class="text-right">{{ selectedDetail.category === 'Malaysia' ? 'MYR':'USD' }}{{ item.price.toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
        <p class="text-right font-bold mt-4">TOTAL: {{ selectedDetail.currency }} {{ selectedDetail.amount.toFixed(2) }}</p>
        <p class="text-right">Payment Method: {{ formatCamelCase(selectedDetail.paymentMethod) }}</p>
        <p class="text-right">Created At: {{ formatDateString(selectedDetail.created_at) }}</p>
        <div class="modal-action flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
          <div class="flex flex-col w-full gap-2">
            <div class="flex items-center gap-2"><label for="payment-link">Retry Payment:</label><input name="payment-link" type="text" class="input input-bordered input-sm w-full max-w-md h-auto" readonly :value="selectedDetail.payment_link" /></div>
            <div class="flex items-center gap-2"><label for="receipt-link">Receipt Link:</label><input name="receipt-link" type="text" class="input input-bordered input-sm w-full max-w-md h-auto" readonly :value="encryptedLink" /></div>
          </div>
          <button class="btn btn-primary" @click="generatePDF">Download PDF</button>
          <button class="btn" @click="closeModal">Close</button>
        </div>
      </div>
    </div>

    <!-- Status Desc. -->
    <div class="overflow-x-auto mt-16">
      <table class="table table-zebra w-full table-xs">
        <thead>
          <tr>
            <th>Status</th>
            <th>Description</th>
            <th>Admin Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="badge badge-error">Attempted</span></td>
            <td>A The payment is pending and awaiting confirmation from USAINS.</td>
            <td>Monitor updates from USAINS.</td>
          </tr>
          <tr>
            <td><span class="badge badge-warning">Captured</span></td>
            <td>The payment has been captured by USAINS</td>
            <td>Send the generated receipt and participant's form link to payee's email.</td>
          </tr>
          <tr>
            <td><span class="badge badge-accent">PO requested</span></td>
            <td>Purchase order has been requested by the user.</td>
            <td>Follow up through email</td>
          </tr>
          <tr>
            <td><span class="badge badge-secondary">Refund Requested</span></td>
            <td>The customer has requested a refund for the payment.</td>
            <td>Review the refund request and process the refund if approved.</td>
          </tr>
          <tr>
            <td><span class="badge badge-info">Refunded</span></td>
            <td>The payment has been refunded to the customer.</td>
            <td>No action required. The refund has been processed.</td>
          </tr>
          <tr>
            <td><span class="badge badge-ghost">Cancelled</span></td>
            <td>The payment or order has been cancelled by the customer or the admin.</td>
            <td>No action required. The order has been cancelled.</td>
          </tr>
          <tr>
            <td><span class="badge badge-success">Completed</span></td>
            <td>The payment has been successfully processed and the transaction is complete.</td>
            <td>No action required. The order can be fulfilled.</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { createClient } from '@supabase/supabase-js';
import { jsPDF } from "jspdf";
import letterheadUrl from "../assets/images/top-letterhead.png";
import footerUrl from "../assets/images/footer-letterhead.png";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default {
  name: 'Admin',
  data() {
    return {
      items: [],
      showModal: false,
      selectedDetail: {},
      defaultStatStatus: 'attempted',
      selectedStatusFilter: null,
      originalStatus: '',
      selectedStatus: '',
      currentPage: 1,
      pageSize: 10,
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    parsedItems() {
      try {
        return JSON.parse(this.selectedDetail.items);
      } catch (e) {
        return [];
      }
    },
    totalPages() {
      return Math.ceil(this.items.length / this.pageSize);
    },
    paginatedItems() {
      let filteredItems = this.items;
      if (this.selectedStatusFilter) {
        filteredItems = filteredItems.filter(item => item.status === this.selectedStatusFilter);
      }
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return filteredItems.slice(startIndex, endIndex);
    },
    totalCollections() {
      return this.items.reduce((total, item) => {
        if (item.status === 'completed') {
          const amount = item.currency === 'MYR' ? item.amount : item.amount * 4.80;
          return total + amount;
        }
        return total;
      }, 0);
    },
    completedRegistrants() {
      return this.items.filter(item => item.status === 'completed').length;
    },
    statusCounts() {
      return this.items.filter(item => item.status === this.defaultStatStatus).length;
    },
  },
  methods: {
    ...mapMutations(['authenticate']),
    filterByStatusBadge(status) {
      this.selectedStatusFilter = status;
      this.currentPage = 1; // Reset the current page to 1 after filtering
    },
    clearStatusFilter() {
      this.selectedStatusFilter = null;
      this.currentPage = 1; // Reset the current page to 1 after clearing the filter
    },
    logout() {
      this.authenticate(false);
      this.$router.push('/login');
    },
    async fetchData() {
      const { data, error } = await supabase
        .from('registration')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
        return;
      }

      this.items = data;
      localStorage.setItem('registrations', JSON.stringify(data));
      this.lastFetched = new Date().toLocaleString(); // Update to more user-friendly format
    },
    showDetails(item) {
      this.selectedDetail = { ...item };
      this.originalStatus = item.status;  // Save the original status
      this.selectedStatus = item.status;  // Initialize selected status
      this.showModal = true;
      this.encryptedLink = this.generateEncryptedLink(item);
    },
    closeModal() {
      this.showModal = false;
    },
    formatCamelCase(method) {
      let formatted = method.replace(/([A-Z])/g, ' $1').trim();
      return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    },
    statusClass(status) {
      switch (status) {
        case 'PO requested':
          return 'badge badge-accent';  // Teal
        case 'completed':
          return 'badge badge-success'; // Green
        case 'Pending Payment':
          return 'badge badge-warning'; // Yellow
        case 'captured':
          return 'badge badge-warning'; // Yellow
        case 'attempted':
          return 'badge badge-error';   // Red
        case 'Rejected':
          return 'badge badge-secondary'; // Dark gray
        case 'refunded':
          return 'badge badge-info'; // Blue
        case 'cancelled':
          return 'badge badge-ghost';   // Transparent
        case 'In Progress':
          return 'badge badge-purple';  // Purple
        default:
          return 'badge badge-neutral'; // Mid gray
      }
    },
    saveStatusChange() {
      this.updateStatusInSupabase(this.selectedDetail.order_id, this.selectedStatus);
    },
    cancelStatusChange() {
      this.selectedDetail.status = this.originalStatus;  // Revert the local detail status
      this.selectedStatus = this.originalStatus;  // Revert the status dropdown
    },
    async updateStatusInSupabase(orderId, newStatus) {
      try {
        const { data, error } = await this.supabase
          .from('registration')
          .update({ status: newStatus })
          .eq('order_id', orderId);
        
        if (error) throw error;
        
        this.selectedDetail.status = newStatus;  // Update the local detail status
        alert('Status updated successfully!');
      } catch (error) {
        console.error('Error updating status:', error);
        alert('Failed to update status.');
      }
    },
    formatDateString(isoString) {
      // Create a Date object from the ISO string
      const date = new Date(isoString);
      const localDate = new Date(date.getTime());

      // Format the date components
      const day = localDate.getDate().toString().padStart(2, '0');
      const month = (localDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
      const year = localDate.getFullYear();
      const hours = localDate.getHours().toString().padStart(2, '0');
      const minutes = localDate.getMinutes().toString().padStart(2, '0');
      const seconds = localDate.getSeconds().toString().padStart(2, '0');

      // Construct the formatted date string
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    },
    generateEncryptedLink(details) {
      const baseLink = `https://register.apamtmalaysia.com/onlinepayment-success`;
      const params = new URLSearchParams({
        orderId: details.order_id,
        bill_name: encodeURIComponent(details.bill_name),
        amount: details.amount,
        currency: details.currency
      });
      // Example of encoding (not actual encryption)
      return `${baseLink}?${btoa(params.toString())}`;
    },
    async generatePDF() {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: 'mm',
        format: 'a4'
      });

      try {
        // Load and add the header image
        const headerResponse = await fetch(letterheadUrl);
        const headerBlob = await headerResponse.blob();
        const headerReader = new FileReader();

        headerReader.onloadend = async () => {
          const base64Header = headerReader.result;
          const headerHeight = 30; // Adjust as per your header image
          doc.addImage(base64Header, 'PNG', 0, 0, 210, headerHeight);

          // Load and add the footer image
          const footerResponse = await fetch(footerUrl);
          const footerBlob = await footerResponse.blob();
          const footerReader = new FileReader();

          footerReader.onloadend = () => {
            const base64Footer = footerReader.result;
            const footerHeight = 55; // Adjust as per your footer image
            const footerYPosition = 297 - footerHeight; // 297mm is the height of an A4 page
            doc.addImage(base64Footer, 'PNG', 0, footerYPosition, 210, footerHeight);

            // Setting initial y-coordinate after the header
            const endY = footerYPosition - 5;
            let currentY = headerHeight + 40;

            // Adding payee details
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");

            const details = {
              Name: this.selectedDetail.bill_name,
              Phone: this.selectedDetail.mobile_number,
              Email: this.selectedDetail.bill_email,
              Address: this.selectedDetail.address,
              Membership: this.formatCamelCase(this.selectedDetail.membership),
              OrderId: this.selectedDetail.order_id,
            };

            doc.setFont("helvetica", "bold");
            doc.setFontSize(20);
            doc.text('Receipt [PAID]', 132, 40);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            doc.text(`Date: ${this.formatDateString(this.selectedDetail.created_at)}`, 132, 47);
            doc.text(`Order Id: ${details.OrderId}`, 132, 52);
            
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.text('Bill To', 20, currentY - 5);
            doc.setFont("helvetica", "normal");
            // Iterate over the details object and print each detail
            Object.keys(details).forEach(key => {
              const value = details[key];
              let text = `${key}: ${value}`;
              if (key === 'Address' && value.length > 40) { // Check if the key is 'Address' and if it's longer than 40 characters
                let splitText = doc.splitTextToSize(text, 90); // Split the text into multiple lines if necessary
                splitText.forEach(line => {
                  doc.text(line, 20, currentY); // Print each line
                  currentY += 6; // Increment y coordinate for each line
                });
              } else if (key === 'OrderId') {
                  return;
              } else {
                doc.text(text, 20, currentY); // Print normally for short text
                currentY += 6; // Increment y coordinate for next line
              }
            });

            currentY = 125; // Starting Y position for the table, adjust based on your content

            // Table Header
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text('Description', 20, currentY);
            doc.text('Price (MYR)', 190, currentY, 'right');
            doc.setFont("helvetica", "normal");
            currentY += 4;

            // Table Content
            currentY += 6; // Space before starting items
            let totalAmount = 0;
            this.parsedItems.forEach(item => {
              doc.text(`${this.formatCamelCase(item.type)} ${item.name ? `- ${item.name}` : ''} - ${details.Membership}`, 20, currentY);
              let price = item.price;
              if (this.selectedDetail.category !== 'Malaysia') {
                price *= 4.80; // Apply the fixed conversion rate for non-Malaysia categories
              }
              doc.text(price.toFixed(2), 190, currentY, 'right');
              currentY += 6; // Increment Y for each item
              totalAmount += price; // Update totalAmount for each item
            });

            // Transaction Fee
            let transactionFee = totalAmount * 0.02;
            doc.setFont("helvetica", "normal");
            doc.text('--------------------', 20, currentY);
            doc.text('2% Transaction Fee (MYR)', 20, currentY + 5);
            const formattedFees = transactionFee.toFixed(2);
            doc.text('--------------------', 190, currentY, 'right');
            doc.text(formattedFees, 190, currentY + 5, 'right');
            doc.setFont("helvetica", "normal");

            // Grand Total
            let grandTotal = totalAmount + transactionFee;
            doc.setFont("helvetica", "bold");
            doc.text('--------------------', 20, currentY);
            doc.text('Grand Total (MYR)', 20, currentY + 10);
            const formattedGrandTotal = grandTotal.toFixed(2);
            doc.text('--------------------', 190, currentY, 'right');
            doc.text(formattedGrandTotal, 190, currentY + 10, 'right');
            doc.setFont("helvetica", "normal");

            // Slogan
            doc.setFont("helvetica", "italic");
            doc.setFontSize(10);
            doc.text('"Transforming Toxicology Landscape for Safer and Sustainable Tomorrow."', 105, endY, null, null, 'center');
            
            // Generate a blob from the PDF and open it in a new window
            const pdfBlob = doc.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            const downloadLink = document.createElement('a');
            downloadLink.href = pdfUrl;
            downloadLink.download = `Receipt-${details.OrderId}-${details.Name}.pdf`;  // Specify the filename here
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            // Delayed revocation of the blob URL
            setTimeout(() => {
              URL.revokeObjectURL(pdfUrl);
            }, 1000); // Delay the revocation by 1 second to ensure the PDF loads
          };

          footerReader.readAsDataURL(footerBlob);
        };

        headerReader.readAsDataURL(headerBlob);
      } catch (error) {
        console.error("Error loading or processing images:", error);
      }
    }
  }
};
</script>

<style scoped>
.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px; /* Fully rounded corners for the badge */
  color: #000;
  @apply text-xs font-semibold;
}
</style>
