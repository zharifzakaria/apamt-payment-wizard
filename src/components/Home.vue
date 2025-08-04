<template>
    <div class="md:m-4 p-4 pb-0 pl-4 md:pl-0 max-w-sm md:max-w-3xl rounded-md md:mx-auto md:mb-0">
        <h1 class="text-lg md:text-xl font-bold">APAMT2024 Online Registration Form</h1>
        <p>Please complete this form for submission.</p>
    </div>
    <div class="flex flex-col md:flex-row max-w-sm md:max-w-3xl mx-auto rounded-md md:mb-20 mb-0">
        <div class="navigator text-sm md:w-3/12 rounded-tl-md md:rounded-bl-md md:rounded-tr-none rounded-tr-md p-2 pt-10 pl-0 hidden md:block">
            <ul>
                <li class="">
                    <span :class="{'text-black': step > 0, 'text-gray-400': step <= 0}">Step 1: User Details</span>
                    <span v-if="step > 1" class="text-green-500 ml-2">&#10003;</span>
                </li>
                <li class="">
                    <span :class="{'text-black': step > 1, 'text-gray-400': step <= 1}">Step 2: Affiliation</span>
                    <span v-if="step > 2" class="text-green-500 ml-2">&#10003;</span>
                </li>
                <li class="">
                    <span :class="{'text-black': step > 2, 'text-gray-400': step <= 2}">Step 3: Membership Details</span>
                    <span v-if="step > 3" class="text-green-500 ml-2">&#10003;</span>
                </li>
                <li class="">
                    <span :class="{'text-black': step > 3, 'text-gray-400': step <= 3}">Step 4: Conference Option</span>
                    <span v-if="step > 4" class="text-green-500 ml-2">&#10003;</span>
                </li>
                <li class="">
                    <span :class="{'text-black': step > 3, 'text-gray-400': step <= 3}">Step 5: Add-Ons</span>
                    <span v-if="step > 5" class="text-green-500 ml-2">&#10003;</span>
                </li>
                <li class="">
                    <span :class="{'text-black': step > 4, 'text-gray-400': step <= 4}">Step 6: Payment Details</span>
                    <span v-if="step > 6" class="text-green-500 ml-2">&#10003;</span>
                </li>
            </ul>
        </div>
        <div class="wizard p-6 md:p-10 md:w-9/12 shadow-lg m-4">
        <form @submit.prevent="submitForm">
            <!-- Step 1 -->
        <div v-if="step === 1" class="step">
            <h2 class="text-xl font-semibold mb-4">Step 1: User Details<span class="ml-4 font-normal text-xs text-slate-500"> (*) Required fields</span> </h2>
        <div class="form-control">
            <label class="label">
            <span class="label-text">*Title</span>
            </label>
            <select v-model="title" class="select select-bordered">
            <option disabled value="">Select your title</option>
            <option>Ms.</option>
            <option>Mr.</option>
            <option>Dr.</option>
            <option>Assoc. Professor</option>
            <option>Professor</option>
            </select>
        </div>
        <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div class="form-control md:flex-1">
            <label class="label">
                <span class="label-text">*First Name</span>
            </label>
            <input v-model="firstName" type="text" placeholder="Enter your first name" class="input input-bordered">
            </div>
            <div class="form-control flex-1">
            <label class="label">
                <span class="label-text">*Last Name</span>
            </label>
            <input v-model="lastName" type="text" placeholder="Enter your last name" class="input input-bordered">
            </div>
        </div>
        <div class="form-control">
            <label class="label">
            <span class="label-text">*Email</span>
            </label>
            <input v-model="email" type="email" placeholder="Enter your email" class="input input-bordered" @blur="emailTouched = true">
            <p v-if="emailTouched && emailError" class="text-red-500 text-xs mt-1">{{ emailError }}</p>
        </div>
        <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div class="form-control md:flex-1">
                <label class="label">
                <span class="label-text">*Country Code</span>
                </label>
                <div class="join">
                    <div class="input input-bordered join-item w-11 text-black flex items-center justify-center">+</div>
                    <input v-model="countryCode" type="text" placeholder="60" class="input input-bordered join-item" @blur="countryCodeTouched = true">
                </div>
                <p v-if="countryCodeTouched && countryCodeError" class="text-red-500 text-xs mt-1">{{ countryCodeError }}</p>
            </div>
            <div class="form-control flex-1">
                <label class="label">
                <span class="label-text">*Phone Number</span>
                </label>
                <input v-model="phoneNumber" type="text" placeholder="2345678900" class="input input-bordered" @blur="phoneTouched = true">
                <p v-if="phoneTouched && phoneError" class="text-red-500 text-xs mt-1">{{ phoneError }}</p>
            </div>
        </div>
    </div>
        <!-- Step 2 -->
        <div v-if="step === 2" class="step">
            <h2 class="text-xl font-semibold mb-4">Step 2: Affiliation<span class="ml-4 font-normal text-xs text-slate-500"> (*) Required fields</span> </h2>
            <div class="form-control">
                <label class="label">
                <span class="label-text">*Affiliation (Organisation/Institution)</span>
                </label>
                <input v-model="affiliation" type="text" placeholder="Enter your affiliation" class="input input-bordered">
            </div>
            <div class="form-control">
                <label class="label">
                <span class="label-text">*Position</span>
                </label>
                <input v-model="position" type="text" placeholder="Enter your position" class="input input-bordered">
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">*Address Line 1</span>
                </label>
                <input v-model="addressLine1" type="text" placeholder="Enter your address line 1" class="input input-bordered">
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Address Line 2</span>
                </label>
                <input v-model="addressLine2" type="text" placeholder="Enter your address line 2" class="input input-bordered">
            </div>
            <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div class="form-control md:flex-1">
                    <label class="label">
                    <span class="label-text">City</span>
                    </label>
                    <input v-model="city" type="text" placeholder="Enter your city" class="input input-bordered">
                </div>
                <div class="form-control flex-1">
                <label class="label">
                <span class="label-text">Postcode</span>
                </label>
                <input v-model="postcode" type="text" placeholder="Enter your postcode" class="input input-bordered">
            </div>
            </div>
            <div class="form-control">
                <label class="label">
                <span class="label-text">*State</span>
                </label>
                <input v-model="state" type="text" placeholder="Enter your state" class="input input-bordered">
            </div>
            <div class="form-control relative">
                <label class="label">
                    <span class="label-text">*Country</span>
                </label>
                <input
                    v-model="countryQuery"
                    type="text"
                    placeholder="Enter your country"
                    class="input input-bordered"
                />
                <div class="dropdown" v-if="showDropdown">
                    <div
                        class="dropdown-item"
                        v-for="country in filteredCountries"
                        :key="country.code"
                        @click="selectCountry(country.name)"
                    >
                    {{ country.name }}
                    </div>
                </div>
            </div>
        </div>
        <!-- Step 3: Membership Details -->
        <div v-if="step === 3" class="step">
            <h2 class="text-xl font-semibold mb-4">Step 3: Membership Details</h2>
            <div class="form-control">
                <label class="label flex justify-start gap-2">
                    <input type="checkbox" v-model="isStudent" class="checkbox">
                    <span class="label-text">I am a Student</span>
                </label>
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Membership Type</span>
                </label>
                <select v-model="membershipType" class="select select-bordered" :disabled="isStudent">
                    <option disabled value="">Choose membership type</option>
                    <option value="NonMembers">Non-Member of APAMT/EAPCCT/AACT</option>
                    <option value="Members">APAMT Life Member/EAPCCT/AACT Member</option>
                    <option value="FinancialMembers">APAMT Current (2024) Financial Member</option>
                </select>
            </div>
            <div v-if="membershipType && !isStudent && membershipType !== 'NonMembers'" class="form-control">
                <label class="label">
                    <span class="label-text">Membership Number</span>
                </label>
                <input v-model="membershipNo" type="text" placeholder="Enter your membership number" class="input input-bordered">
            </div>
        </div>
        <!-- Step 4: Conference Option -->
        <div v-if="step === 4" class="step">
            <h2 class="text-xl font-semibold mb-4">Step 4: Conference Option</h2>
            <div class="form-control">
                <div class="flex flex-col gap-2">
                    <label class="label border border-grey-400 bg-gradient-to-br from-slate-100 to-indigo-100 hover:bg-slate-200 transition-colors duration-300 cursor-pointer rounded-md p-2  flex flex-wrap">
                        <input type="radio" v-model="conferenceOption" value="full" class="radio bg-white" @change="onConferenceOptionChange">
                        <span class="ml-2">Full Conference ({{ currency }}{{ pricing }})</span>
                        <!-- Description -->
                            <div v-if="step === 4 && conferenceOption === 'full'" class="form-control ml-auto w-full mt-4">
                            <hr/>
                            <p class="text-sm">Registration Fee Includes:</p>
                            <ul class="flex flex-col items-start text-sm list-desc pl-4">
                                <li>1. Access to <strong>all sessions</strong></li>
                                <li>2. Conference Kit, Conference Program and Abstract Book</li>
                                <li>3. <strong>E-Certificate of Attendance</strong> (after completing the feedback form)</li>
                                <li>4. Morning and afternoon <strong>tea-breaks and lunch</strong> on  12, 13 & 14 November 2024</li>
                                <li>5. <strong>Complimentary Gala Dinner</strong> on 13 November 2024 hosted by the organiser</li>
                            </ul>
                        </div>
                    </label>
                    <label class="label border border-grey-400 bg-gradient-to-br from-slate-100 to-indigo-100 hover:bg-slate-100 transition-colors duration-300 cursor-pointer rounded-md p-2 flex flex-wrap">
                        <input type="radio" v-model="conferenceOption" value="day" class="radio bg-white" @change="onConferenceOptionChange">
                        <span class="ml-2">Day Conference</span>
                        
                        <!-- Select Days -->
                        <div v-if="step === 4 && conferenceOption === 'day'" class="form-control ml-auto w-full mt-4">
                            <hr/>
                            <label class="label">
                                <span class="label-text"><i>Select Date: (maximum of 2)</i></span>
                            </label>
                            <div class="flex flex-col items-start">
                                <label class="label cursor-pointer" v-for="(day, index) in ['12 Nov', '13 Nov', '14 Nov']" :key="index">
                                    <input type="checkbox" :value="day" v-model="selectedDays" @change="onSelectedDaysChange" class="checkbox bg-white">
                                    <span class="ml-2">{{ day }} ({{ currency }} {{ dayConferencePrices[countryCategory] }})</span>
                                </label>
                            </div>
                            <!-- Description -->
                            <div class="form-control ml-auto w-full mt-4">
                                <hr/>
                                <p class="text-sm mt-4">Includes:</p>
                                <ul class="flex flex-col items-start text-sm list-desc pl-4">
                                    <li>1. Access to <strong>all sessions</strong> according to the day registered</li>
                                    <li>2. Conference Kit, Conference Program and Abstract Book</li>
                                    <li>3. <strong>E-Certificate of Attendance</strong> (after completing the feedback form)</li>
                                    <li>4. Morning and afternoon <strong>tea-breaks and lunch</strong> on  12, 13 & 14 November 2024</li>
                                </ul>
                            </div>
                        </div>
                    </label>
                    <label class="label border border-grey-400 bg-gradient-to-br from-slate-100 to-indigo-100 hover:bg-slate-100 transition-colors duration-300 cursor-pointer rounded-md p-2">
                        <input type="radio" v-model="conferenceOption" value="workshop" class="radio bg-white" @change="onConferenceOptionChange">
                        <span class="ml-2">Workshop Only</span>
                    </label>

                    <label class="hidden label border border-grey-400 bg-gradient-to-br from-slate-100 to-indigo-100 hover:bg-slate-100 transition-colors duration-300 cursor-pointer rounded-md p-2">
                        <input type="radio" v-model="conferenceOption" value="TEST" class="radio bg-white" @change="onConferenceOptionChange">
                        <span class="ml-2">TEST (MYR1.00)</span>
                    </label>
                </div>
            </div>
        </div>
        <!-- Step 5 -->
        <div v-if="step === 5" class="step">
            <h2 class="text-xl font-semibold mb-4">Step 5: Add-ons</h2>
            <div class="form-control">
                <label class="label font-semibold">Select a Workshop{{ conferenceOption === 'workshop' ? ' (Required)' : ' (Optional)' }}</label>
                <div v-for="(workshop, index) in workshopPrices" :key="index" class="form-control">
                    <label class="label flex justify-start gap-2">
                        <input type="radio" :value="workshop" v-model="selectedWorkshop" @click="toggleWorkshopSelection(workshop)" class="radio" name="workshopSelection">
                        <span class="label-text">{{ workshop.name }} ({{ currency }}{{ workshop.prices[countryCategory] }})</span>
                    </label>
                </div>
                <label class="label flex justify-start gap-2" v-if="conferenceOption === 'full'">
                    <input type="radio" value="not attending" v-model="selectedWorkshop" class="radio" name="workshopSelection">
                    <span class="label-text">Not Attending Workshop</span>
                </label>
            </div>
            <div v-if="conferenceOption !== 'workshop'" class="form-control">
                <label class="label font-semibold mt-4">Additional Pax for Gala Dinner*</label>
                <label class="label flex justify-start gap-2">
                    <input type="checkbox" v-model="galaDinner" @change="calculateTotalPrice" class="checkbox">
                    <span class="label-text">Yes ({{ currency }}{{ galaDinnerPrices[countryCategory] }} per person)</span>
                </label>
                <div v-if="galaDinner">
                    <label class="label">
                        <span class="label-text">Additional pax(s) needed:</span>
                    </label>
                    <input type="number" v-model="galaDinnerPeople" min="1" class="input input-bordered" @change="calculateTotalPrice">
                </div>
                <p><small><i>*One (1) seat is complimentary for Full Conference attendee.</i></small></p>
            </div>
        </div>
        <!-- Step 6 -->
        <div v-if="step === 6" class="step">
            <h2 class="text-xl font-semibold mb-4">Step 6: Payment Details</h2>
            <div class="border border-gray-300 rounded-md p-4 my-2 text-sm">
                <p><strong>Name:</strong> {{ title }} {{ firstName }} {{ lastName }}</p>
                <p><strong>Contact:</strong> +{{ fullPhoneNumber }} / {{ email }}</p>
                <p><strong>Membership Type:</strong> {{ isStudent ? 'None (Student)' : formatMembershipType(membershipType) }}</p>
                <p><strong>Address:</strong> {{ fullAddress }}</p>
                <p><strong>Discount Eligibility*:</strong> {{ discountEligibility }}</p>
                <div class="mt-2">
                    <p><strong>Conference Option:</strong> {{ formatConferenceOption(conferenceOption) }} ({{ currency }}{{ calculateConferencePrice() }})</p>
                    <template v-if="conferenceOption === 'day'">
                        <p><strong>Selected Days:</strong> {{ selectedDays.join(', ') }}</p>
                    </template>
                    <template v-if="selectedWorkshop && selectedWorkshop.name !== 'not attending'">
                        <p><strong>Selected Workshop:</strong> {{ selectedWorkshop.name }}
                            <span v-if="selectedWorkshop.prices && selectedWorkshop.prices[countryCategory] !== undefined">
                                ({{ currency }}{{ selectedWorkshop.prices[countryCategory] }})
                            </span>
                            <span v-else> -</span>
                        </p>
                    </template>
                    <template v-if="galaDinner">
                        <p><strong>Gala Dinner:</strong> Additional {{ galaDinnerPeople }} pax ({{ currency }}{{ galaDinnerPrices[countryCategory] * galaDinnerPeople }})</p>
                    </template>
                </div>
                <div class="mt-6 grid grid-cols-3 gap-1 py-2">
                    <p class="col-span-1">Amount:</p>
                    <p class="text-right">{{ currency }}</p>
                    <p class="text-right">{{ invoiceData.pricing?.toFixed(2) }}</p>
                    <template v-if="currency !== 'MYR'">
                        <p class="col-span-1">*Converted Amount:</p>
                        <p class="text-right">MYR</p>
                        <p class="text-right">{{ convertedAmount?.toFixed(2) }}</p>
                        <p class="col-span-1">2% Transaction Fee:</p>
                        <p class="text-right">MYR</p>
                        <p class="text-right">{{ transactionFee?.toFixed(2) }}</p>
                        <hr class="col-span-3" />
                        <p class="font-bold col-span-1">TOTAL</p>
                        <p class="font-bold text-right">MYR</p>
                        <p class="font-bold text-right">{{ totalAmount?.toFixed(2) }}</p>
                        
                        <div class="col-span-3 text-xs text-gray-600 mt-4">
                            <p class="font-bold">Invitation/Supporting Letter Request</p>
                            <p>Please note that invitation letters or supporting letters will only be issued upon request. All participants and speakers who need an invitation letter, please contact the conference organizers at <a class="underline text-blue-700" href="mailto:apamtMalaysia@usm.my." target="_blank">apamtMalaysia@usm.my.</a></p>
                        </div>

                        <div class="col-span-3 text-xs text-gray-600 mt-2">
                            <p class="font-bold">*Fixed Exchange Rate for Conference Registration</p>
                            <p>To ensure a smooth and predictable registration process, our conference will utilize a fixed exchange rate of <span class="badge badge-outline rounded text-xs mx-1">1 USD = 4.80 MYR</span> for all bookings. This rate remains constant, protecting you from any currency fluctuations and making your financial planning easier. Register with confidence, knowing the exact cost in your local currency.</p>
                        </div>
                    </template>
                    <template v-else>
                        <p class="col-span-1">2% Transaction Fee:</p>
                        <p class="text-right">MYR</p>
                        <p class="text-right">{{ (invoiceData.pricing * 0.02).toFixed(2) }}</p>
                        <hr/><hr/><hr/>
                        <p class="font-bold col-span-1">TOTAL:</p>
                        <p class="font-bold text-right">MYR</p>
                        <p class="font-bold text-right">{{ (invoiceData.pricing * 0.02 + invoiceData.pricing).toFixed(2) }}</p>
                    </template>
                </div>

            </div>

            <div class="form-control">
                <label class="label">
                <span class="label-text">Payment Method:</span>
                </label>
                <div class="flex flex-col gap-4">
                    <label class="flex items-center border border-grey-400 bg-gradient-to-br from-slate-100 to-indigo-100 hover:bg-slate-100 transition-colors duration-300 cursor-pointer rounded-md p-2">
                        <input type="radio" v-model="paymentMethod" value="OnlinePayment" class="radio bg-white">
                        <span class="ml-2">Online Payment</span>
                        <div class="flex transform scale-50 m-0 p-0 -ml-8">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><path fill="#1565C0" d="M45 35a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V13a4 4 0 0 1 4-4h34a4 4 0 0 1 4 4v22z"/><path fill="#FFF" d="m15.186 19-2.626 7.832s-.667-3.313-.733-3.729c-1.495-3.411-3.701-3.221-3.701-3.221L10.726 30v-.002h3.161L18.258 19h-3.072zm2.503 11h2.871l1.736-11h-2.907zm20.319-11h-3.021l-4.71 11h2.852l.588-1.571h3.596L37.619 30h2.613l-2.224-11zm-3.495 7.328 1.563-4.157.818 4.157h-2.381zm-8.144-4.122c0-.606.498-1.057 1.926-1.057.928 0 1.991.674 1.991.674l.466-2.309s-1.358-.515-2.691-.515c-3.019 0-4.576 1.444-4.576 3.272 0 3.306 3.979 2.853 3.979 4.551 0 .291-.231.964-1.888.964-1.662 0-2.759-.609-2.759-.609l-.495 2.216s1.063.606 3.117.606c2.059 0 4.915-1.54 4.915-3.752 0-2.661-3.985-2.853-3.985-4.041z"/><path fill="#FFC107" d="m12.212 24.945-.966-4.748s-.437-1.029-1.573-1.029h-4.44s5.661 1.672 6.979 5.777z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><path fill="#ff9800" d="M32 10a14 14 0 1 0 0 28 14 14 0 1 0 0-28Z"/><path fill="#d50000" d="M16 10a14 14 0 1 0 0 28 14 14 0 1 0 0-28Z"/><path fill="#ff3d00" d="M18 24c0 4.755 2.376 8.95 6 11.48 3.624-2.53 6-6.725 6-11.48s-2.376-8.95-6-11.48c-3.624 2.53-6 6.725-6 11.48z"/></svg>
                            <img src="../assets/images/FPX.svg" alt="FPX"/>
                        </div>
                    </label>
                    <label class="flex items-center border border-grey-400 bg-gradient-to-br from-slate-100 to-indigo-100 hover:bg-slate-100 transition-colors duration-300 cursor-pointer rounded-md p-2" v-if="countryCategory === 'Malaysia'">
                        <input type="radio" v-model="paymentMethod" value="PurchaseOrder" class="radio bg-white">
                        <span class="ml-2">Purchase Order</span>
                    </label>
                </div>
            </div>
            <!-- Purchase Order button-->
            <div v-if="paymentMethod === 'PurchaseOrder'" class="invoice mt-6">
                <p class="text-sm my-2 pb-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline stroke-current shrink-0 w-5 h-5 mr-1"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Invoice will be generated by 'USains Holding' and will be emailed to you at <span class="underline">{{ email }}</span> </p>
                <button @click="sendPOData" class="btn btn-primary w-full">
                <span v-if="isLoading" class="loading loading-spinner loading-xs"></span>Confirm Registration
                </button>
            </div>
            <!-- Online Payment button -->
            <div v-if="paymentMethod === 'OnlinePayment'" class="form-control mt-6">
                <p class="text-sm my-2 pb-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline stroke-current shrink-0 w-5 h-5 mr-1"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Once payment has been made, <span class="font-semibold">an official receipt acknowledging confirmation of payment and registration will be issued within 2 weeks</span> to your email at <span class="underline">{{ email }}</span> </p>
                <button @click="sendPaymentData" class="btn btn-primary">
                <span v-if="isLoading" class="loading loading-spinner loading-xs"></span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Proceed to Payment
                </button>
            </div>
            </div>
        <div class="flex space-x-4 mt-6">
            <button v-if="step > 1" @click="goToPreviousStep" type="button" class="btn btn-outline btn-primary">Previous</button>
            <button v-if="step < 6" @click="goToNextStep" :disabled="!isNextButtonEnabled" class="btn btn-primary">Next</button>
        </div>
        <div v-if="step === 6" class="mt-4 text-xs text-gray-500">
            <p>*Discount eligibility are based on <a class="underline" href="https://www.un.org/development/desa/dpad/wp-content/uploads/sites/45/WESP2022_ANNEX.pdf" target="_blank">World Economic Situation and Prospects 2022 (un.org) (page 153-154).<svg xmlns="http://www.w3.org/2000/svg" class="inline ml-1" width="13" height="13" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5m5-3h6v6m-11 5L20.2 3.8"/></svg></a> </p>
        </div>
        </form>
        </div>
    </div>
</template>
  
<script>
    import { mapMutations } from 'vuex';
    import countriesData from '../assets/countries.json';
    import sampleData from '../assets/sampleData.json';

    export default {
    name: 'Home',
    data() {
        return {
        devMode: true,
        step: 1,
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '',
        phoneNumber: '',
        affiliation: '',
        position: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postcode: '',
        affiliationCountry: '',
        country: '',
        membershipType: '',
        membershipNo: '',
        isStudent: false,
        isLoading: false,
        countryQuery: '',
        countryCategory: '',
        countries: countriesData,
        showDropdown: false,
        emailTouched: false,
        phoneTouched: false,
        countryCodeTouched: false,
        emailError: '',
        phoneError: '',
        countryCodeError: '',
        paymentMethod: '',
        selectedWorkshop: null,
        galaDinner: '',
        galaDinnerPeople: 1,
        workshopPrices: [
            { 
              name: 'Workshop #1: Traditional Medicine Toxicity Workshop',
              prices: { Developed: 100, Developing: 70, Malaysia: 300},    
            },
            { name: 'Workshop #2: From Research to Application, Towards Better Management of Snake Related Injuries & Envenomation ',
              prices: { Developed: 100, Developing: 70, Malaysia: 300},}
        ],
        galaDinnerPrices: {
            Developed: 50,
            Developing: 50,
            Malaysia: 200,
        },
        conferenceOption: 'full',
        dayConferencePrices: {
            Developed: 225,
            Developing: 175,
            Malaysia: 760,
        },
        selectedDays: [],
        workshops: []
        };
    },
    created() {
        if (this.devMode) {
            Object.assign(this, sampleData);
        }
        this.updateFullMembership();
    },
    watch: {
        '$store.state.devMode'(newDevMode) {
            if (newDevMode) {
                Object.assign(this, sampleData);
            } else {
                this.resetForm();
            }
        },
        countryQuery(newQuery) {
            this.showDropdown = newQuery !== '' && this.filteredCountries.length > 0;
            this.affiliationCountry = newQuery; // Sync with input
        },
        isStudent(newVal) {
            this.$store.commit('setIsStudent', newVal);
            if (newVal) {
                this.membershipType = '';
                this.membershipNo = '';
            }
        },
        membershipType() {
            this.calculateTotalPrice();
        },
        galaDinner(newVal) {
            if (newVal && this.galaDinnerPeople === 0) {
                this.galaDinnerPeople = 1;
            }
        },
        galaDinnerPeople(newVal) {
            this.$store.commit('updateGalaDinner', { galaDinner: newVal > 0, galaDinnerPeople: newVal });
        },
        countryQuery(newQuery) {
            this.showDropdown = newQuery !== '' && this.filteredCountries.length > 0;
            this.affiliationCountry = newQuery; // Update the affiliationCountry with the new query
        },
        affiliationCountry(newCountry) {
            const selectedCountry = this.countries.find(c => c.name === newCountry);
            this.countryCategory = selectedCountry ? selectedCountry.cat : 'Developed'; // Update countryCategory based on the selected country or default to 'Developed'
            this.$store.commit('setCountryCategory', this.countryCategory); // Update the Vuex store with the new country category
            this.calculateTotalPrice(); // Recalculate the total price based on the new country category
        },
        countryCategory(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.onConferenceOptionChange();
            }
        },
        membershipType(newVal) {
            this.updateFullMembership();
            this.calculateTotalPrice();
        },
        membershipNo() {
            this.updateFullMembership();
        },
        pricing(newVal) {
            this.$store.commit('updateInvoicePricing', newVal);
        },
        selectedDays(newValue, oldValue) {
            if (newValue.length > 2) {
                this.selectedDays = oldValue.slice();
                alert('You can select a maximum of 2 days.');
            }
        },
        selectedWorkshop() {
            this.calculateTotalPrice();
        },
    },
    computed: {
        fullName() {
            return `${this.title} ${this.firstName} ${this.lastName}`;
        },
        fullPhoneNumber() {
            return `${this.countryCode} ${this.phoneNumber}`.trim();
        },
        fullAddress() {
            return `${this.addressLine1}, ${this.addressLine2}, ${this.city}, ${this.postcode}, ${this.state}, ${this.affiliationCountry}`;
        },
        pricing() {
            const prices = {
                TEST: {
                    BeforePriceChange: {
                        NonMembers: 1,
                        Members: 1,
                        FinancialMembers: 1,
                        Student: 1,
                    },
                    AfterPriceChange: {
                        NonMembers: 1,
                        Members: 1,
                        FinancialMembers: 1,
                        Student: 1,
                    },
                },
                Developing: {
                BeforePriceChange: {
                    NonMembers: 300,
                    Members: 275,
                    FinancialMembers: 250,
                    Student: 225,
                },
                AfterPriceChange: {
                    NonMembers: 350,
                    Members: 325,
                    FinancialMembers: 300,
                    Student: 225,
                },
                },
                Developed: {
                BeforePriceChange: {
                    NonMembers: 600,
                    Members: 550,
                    FinancialMembers: 500,
                    Student: 300,
                },
                AfterPriceChange: {
                    NonMembers: 650,
                    Members: 600,
                    FinancialMembers: 550,
                    Student: 300,
                },
                },
                Malaysia: {
                BeforePriceChange: {
                    NonMembers: 1300,
                    Members: 1200,
                    FinancialMembers: 1100,
                    Student: 1000,
                },
                AfterPriceChange: {
                    NonMembers: 1500,
                    Members: 1400,
                    FinancialMembers: 1300,
                    Student: 1000,
                },
                },
            };

            // Check for TEST conference type
            if (this.conferenceOption === 'TEST') {
                return 1; // Set the price to 1 for the TEST option
            }

            // Check if the current date is after the early-bird promotion deadline
            const currentDate = new Date();
            const earlyBirdDeadline = new Date('2024-09-15T23:59:59');
            const priceChange = currentDate > earlyBirdDeadline ? 'AfterPriceChange' : 'BeforePriceChange';

            // Determine the price based on the country and membership type
            if (this.countryCategory) {
                const priceCategory = prices[this.countryCategory];
                if (this.isStudent) {
                return priceCategory[priceChange]['Student'];
                } else if (this.membershipType) {
                return priceCategory[priceChange][this.membershipType];
                }
            }

            return 'Please select country and membership type';
        },
        currency() {
        return this.countryCategory === 'Malaysia' ? 'MYR' : 'USD';
        },  
        discountEligibility() {
            if (this.isStudent) {
                return 'Student Discount';
            } else if (this.countryCategory === 'Developing') {
                return 'Developing Country Discount';
            }
            return 'None';
        },
        filteredCountries() {
            return this.countries.filter(country =>
            country.name.toLowerCase().includes(this.countryQuery.toLowerCase())
            );
        },
        isNextButtonEnabled() {
            if (this.step === 1) {
            const emailValid = this.isValidEmail(this.email);
            const phoneValid = this.isValidPhoneNumber(this.phoneNumber);
            const countryCodeValid = this.isValidCountryCode(this.countryCode);
            const allFieldsFilled = this.title && this.firstName && this.lastName && this.email && this.countryCode && this.phoneNumber;
            
            // Update error messages
            this.emailError = emailValid ? '' : 'Invalid email format';
            this.phoneError = phoneValid ? '' : 'Invalid phone number format';
            this.countryCodeError = countryCodeValid ? '' : 'Invalid country code';
            
            return allFieldsFilled && emailValid && phoneValid;
            } else if (this.step === 2) {
            const allFieldsFilled = this.affiliation && this.position && this.addressLine1 && this.state && this.affiliationCountry;
            
            return allFieldsFilled;
            } else if (this.step === 3) {
            return this.isStudent || this.membershipType;
            }
            if (this.step === 5 && this.conferenceOption === 'workshop' && !this.selectedWorkshop) {
                return false; // Disable the Next button if no workshop is selected
            }
            return true;
        },
        invoiceData() {
            return this.$store.state.invoiceData;
        },
        convertedAmount() {
            if (this.currency === 'MYR') {
                return this.invoiceData.pricing;
            } else {
                return this.invoiceData.pricing * 4.8; // Convert to MYR
            }
        },
        transactionFee() {
            return this.convertedAmount * 0.02; // 2% transaction fee
        },
        totalAmount() {
            return this.convertedAmount + this.transactionFee; // Total amount including transaction fee
        },
    },
    methods: {
        ...mapMutations(['updateInvoicePricing', 'updateGalaDinner']),
        calculateTotalPrice() {
            let total = 0;
            // Check the selected conference option and calculate accordingly
            if (this.conferenceOption === 'day') {
                // Calculate the total for day conference
                total = this.selectedDays.reduce((acc, day) => acc + this.dayConferencePrices[this.countryCategory], 0);
            } else if (this.conferenceOption === 'full') {
                // Calculate the total for full conference
                total = this.pricing;  // Ensure 'pricing' is already the full conference price
            }

            // Always include the workshop price if a workshop is selected and not "not attending"
            if (this.selectedWorkshop && this.selectedWorkshop.name && this.selectedWorkshop.name !== 'not attending') {
                const workshop = this.workshopPrices.find(workshop => 
                    workshop.name.trim() === this.selectedWorkshop.name.trim()
                );

                if (workshop) {
                    total += workshop.prices[this.countryCategory]; // Add workshop price
                }
            }

            // Check if gala dinner is selected and add the price
            if (this.galaDinner) {
                total += this.galaDinnerPrices[this.countryCategory] * this.galaDinnerPeople;
            }
            this.$store.commit('setPricing', total);
        },
        onSelectedDaysChange() {
            this.$store.commit('setSelectedDays', this.selectedDays);
            this.calculateTotalPrice();
        },
        preparePaymentData() {
            const products = [];
            let totalAmount = 0; // Initialize totalAmount

            // Add registration or test product
            if (this.conferenceOption === 'TEST') {
                products.push({
                type: 'registration',
                priceChange: this.getPriceChange(),
                price: 1,
                });
                totalAmount = 1; // Update totalAmount for TEST option
            } else {
                // Add workshop product for 'workshop' option
                if (this.conferenceOption === 'workshop' && this.selectedWorkshop) {
                    const workshop = this.workshopPrices.find(w => 
                        w.name.trim() === this.selectedWorkshop.name.trim()
                    );
                    if (workshop) {
                        products.push({
                            type: 'workshop',
                            name: this.selectedWorkshop.name,
                            price: workshop.prices[this.countryCategory]
                        });
                        totalAmount = workshop.prices[this.countryCategory]; // Use correct path to access workshop price
                    } else {
                        totalAmount = 0; // If no matching workshop is found, set total to 0
                    }
                }

                // Add dayConference products for 'day' option
                else if (this.conferenceOption === 'day') {
                this.selectedDays.forEach(day => {
                    products.push({
                    type: 'dayConference',
                    name: day,
                    price: this.dayConferencePrices[this.countryCategory]
                    });
                    totalAmount += this.dayConferencePrices[this.countryCategory]; // Update totalAmount for each day
                });
                }

                // Add registration and workshop products for other options
                else {
                    products.push({
                        type: 'registration',
                        priceChange: this.getPriceChange(),
                        price: this.pricing,
                    });
                    totalAmount = this.pricing; // Start with registration price

                    if (this.selectedWorkshop === 'not attending') {
                        products.push({
                            type: 'workshop',
                            name: 'Not Attending Workshop',
                            price: 0,
                        });
                    } else {
                        // Find the matching workshop object based on the selected workshop name
                        const workshop = this.workshopPrices.find(w => w.name.trim() === this.selectedWorkshop.name.trim());
                        if (workshop) {
                            let workshopPrice = workshop.prices[this.countryCategory];
                            if (this.conferenceOption === 'full') {
                                workshopPrice = 0; // Set workshop price to 0 if full conference
                            }
                            products.push({
                                type: 'workshop',
                                name: this.selectedWorkshop.name,
                                price: workshopPrice
                            });
                            totalAmount += workshopPrice; // Update totalAmount for workshop
                        } else {
                            console.error('No matching workshop found for the selected workshop:', this.selectedWorkshop);
                            // Set a default value or handle the error condition appropriately
                        }
                    }
                }

                // Add galaDinner product if selected
                if (this.galaDinner) {
                products.push({
                    type: 'galaDinner',
                    quantity: this.galaDinnerPeople,
                    price: this.galaDinnerPrices[this.countryCategory] * this.galaDinnerPeople
                });
                totalAmount += this.galaDinnerPrices[this.countryCategory] * this.galaDinnerPeople; // Update totalAmount for galaDinner
                }
            }

            // Convert totalAmount to MYR if necessary and not already in MYR
            if (this.currency !== 'MYR') {
                totalAmount *= 4.80; // Update totalAmount for conversion rate
            }

            // Calculate the transaction fee at 2%
            const transactionFee = totalAmount * 0.02;

            // Construct and return the paymentData object
            const paymentData = {
                name: this.fullName,
                email: this.email,
                bill_name: this.fullName,
                bill_email: this.email,
                address: this.fullAddress,
                currency: 'MYR',
                baseCurrency: this.currency,
                products: products,
                conferenceOption: this.conferenceOption,
                amount: totalAmount + transactionFee,
                membership: this.membershipType,
                isStudent: this.$store.state.invoiceData.isStudent,
                category: this.countryCategory,
                paymentMethod: this.paymentMethod,
                mobile_number: this.fullPhoneNumber.replace(/\s+/g, '')
            };

            return paymentData;
        },
        convertCurrency(amount, fromCurrency, toCurrency = 'MYR') {
            const conversionRate = 4.80;

            if (conversionRate && fromCurrency !== toCurrency) {
                if (fromCurrency === 'USD' && toCurrency === 'MYR') {
                    return amount * conversionRate;
                }
                return parseFloat((amount * conversionRate).toFixed(2));
            }
            return parseFloat(amount.toFixed(2)); // Return the amount unchanged if the currencies are the same
        },
        async sendPaymentData() {
            this.isLoading = true; // Start loading
            const paymentData = this.preparePaymentData();
            try {
                const response = await fetch('https://payment.apamtmalaysia.com/api/create-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(paymentData),
                });

                if (response.ok) {
                    const contentType = response.headers.get("Content-Type");
                    if (contentType && contentType.includes("application/json")) {
                        const responseData = await response.json();
                        console.log("Payment data sent successfully:", responseData);

                        // Extract the paymentLink from the response data
                        const { paymentLink } = responseData;

                        // Redirect to the paymentLink
                        if (paymentLink) {
                                window.location.href = paymentLink;
                            } else {
                                console.error('Payment link not found in response data');
                            }
                        } else {
                            console.log("Payment data sent successfully, but no JSON response");
                        }
                    } else {
                        const errorData = await response.json();
                        console.error('Failed to send payment data:', errorData);
                        // Handle failed payment data submission (e.g., show an error message with details from errorData)
                    }
            } catch (error) {
                console.error('Network error or other issue:', error);
                // Handle network errors or other issues that prevented the request from being sent
            }
        },
        getPriceChange() {
            const currentDate = new Date();
            const earlyBirdDeadline = new Date('2024-09-15T23:59:59');
            return currentDate > earlyBirdDeadline ? 'AfterPriceChange' : 'BeforePriceChange';
        },
        async sendPOData() {
            this.isLoading = true; // Start loading
            const paymentData = this.preparePaymentData();
            try {
                const response = await fetch('https://payment.apamtmalaysia.com/api/create-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(paymentData),
                });

                if (response.ok) {
                    const contentType = response.headers.get("Content-Type");
                    if (contentType && contentType.includes("application/json")) {
                        const responseData = await response.json();
                        window.location.href = responseData.url;
                    } else {
                        console.log("Payment data sent successfully, but no JSON response");
                    }
                } else {
                const errorData = await response.json();
                console.error('Failed to send payment data:', errorData);
                // Handle failed payment data submission (e.g., show an error message with details from errorData)
                }
            } catch (error) {
                console.error('Network error or other issue:', error);
                // Handle network errors or other issues that prevented the request from being sent
            }
        },
        resetForm() {
            // Reset each form field to its initial state
            this.step = 1;
            this.title = '';
            this.firstName = '';
            this.lastName = '';
            this.email = '';
            this.countryCode = '';
            this.phoneNumber = '';
            this.affiliation = '';
            this.position = '';
            this.address = '';
            this.city = '';
            this.state = '';
            this.postcode = '';
            this.affiliationCountry = '';
            this.countryQuery = '';
            this.countryCategory = '';
            this.country = '';
            this.membershipType = '';
            this.membershipNo = '';
            this.isStudent = false;
            this.galaDinner = false;
            this.galaDinnerPeople = 1;
            this.selectedWorkshop = null;
            this.paymentMethod = '';
            // Reset any other data properties as needed
        },
        selectCountry(country) {
            const selectedCountry = this.countries.find(c => c.name === country);
            if (selectedCountry) {
            this.affiliationCountry = country;
            this.countryCategory = selectedCountry.cat;
            this.countryQuery = country; // Update the input field with the selected country name
            } else {
            // Set to 'Developed' if the country is not in the list or the dropdown is empty
            this.affiliationCountry = this.countryQuery; // Use the value from the input field
            this.countryCategory = 'Developed';
            }
            this.$store.commit('setCountryCategory', this.countryCategory);
            this.calculateTotalPrice(); // Recalculate the total price based on the new country category
            this.$nextTick(() => {
            this.showDropdown = false; // Close the dropdown after the next DOM update
            });
        },
        formatMembershipType(membershipType) {
            const types = {
                NonMembers: 'Non-Member of APAMT/EAPCCT/AACT',
                Members: 'APAMT Life Member/EAPCCT/AACT Member',
                FinancialMembers: 'APAMT Current (2024) Financial Member',
            };
            return types[membershipType] || membershipType;
        },
        updateFullMembership() {
            if (this.isStudent) {
                this.$store.commit('updateFullMembership', 'Student');
            } else {
                const membership = this.formatMembershipType(this.membershipType) + (this.membershipNo ? ` ${this.membershipNo}` : '');
                this.$store.commit('updateFullMembership', membership);
            }
        },
        fullMembership() {
            if (this.isStudent) {
                return 'Student';
            }
            return `${this.formatMembershipType(this.membershipType)} ${this.membershipNo}`;
        },
        isValidEmail(email) {
            const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return pattern.test(email);
        },
        isValidPhoneNumber(phone) {
            const pattern = /^\d{7,15}$/;
            return pattern.test(phone);
        },
        isValidCountryCode(countryCode) {
            const pattern = /^\d{2,4}$/;
            return pattern.test(countryCode);
        },
        toggleWorkshopSelection(workshop) {
            // If the same workshop is clicked again, deselect it
            if (this.selectedWorkshop === workshop) {
                this.selectedWorkshop = null;
            } else {
                this.selectedWorkshop = workshop;
            }
            this.$store.commit('setSelectedWorkshop', this.selectedWorkshop);
            this.calculateTotalPrice(); // Recalculate the total price
            },
        goToPreviousStep() {
            if (this.step === 6 && this.conferenceOption === 'day') {
                this.step -= 2; // Skip the Add-ons step
            } else {
                this.step--;
            }
        },
        goToNextStep() {
            if (this.step === 4 && this.conferenceOption === 'day') {
                this.step += 2; // Skip the Add-ons step
            } else {
                this.step++;
            }
        },
        submitForm() {
            return;
        },
        onConferenceOptionChange() {
            this.$store.commit('setConferenceOption', this.conferenceOption);
            // Clear the selected workshop if the conference option is not "workshop"
            if (this.conferenceOption !== 'workshop') {
                this.selectedWorkshop = null;
                this.$store.commit('setSelectedWorkshop', null);
                this.galaDinner = false;
                this.galaDinnerPeople = 1;
                this.$store.commit('updateGalaDinner', { galaDinner: false, galaDinnerPeople: 1 });
            }
            // Recalculate the total price based on the new conference option
            this.calculateTotalPrice();
        },
        formatConferenceOption(option) {
            switch (option) {
                case 'full':
                    return 'Full Conference';
                case 'day':
                    return 'Day Conference';
                case 'workshop':
                    return 'Workshop Only';
                default:
                    return '';
            }
        },
        calculateConferencePrice() {
            if (this.conferenceOption === 'full') {
                return this.pricing; // Full conference price
            } else if (this.conferenceOption === 'day') {
                return this.dayConferencePrices[this.countryCategory] * this.selectedDays.length; // Day conference price multiplied by the number of selected days
            } else if (this.conferenceOption === 'workshop' && this.selectedWorkshop) {
                return this.workshopPrices[this.countryCategory]; // Workshop price
            }
            return 0;
        },
    }
    };
</script>
  
<style scoped>
  .dropdown {
    position: absolute;
    top:86px;
    background-color: white;
    border: 1px solid #ccc;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .dropdown-item {
    padding: 0.5rem;
    cursor: pointer;
  }
  .dropdown-item:hover {
    background-color: #f0f0f0;
  }
</style>