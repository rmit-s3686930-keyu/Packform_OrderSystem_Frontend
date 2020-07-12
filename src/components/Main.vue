<template>
    <div >
        <b-container class="container-fluid" style=" max-width:80%">

            <b-row>
                <b-col>
                <b-input-group size="sm">
                <b-form-input v-model="searchText" placeholder="Enter order name"></b-form-input>
                    <b-input-group-append>
                        <b-button v-on:click="searchOrder">Search</b-button>
                    </b-input-group-append>
                </b-input-group>
                </b-col>
                <b-col></b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-input-group size="sm">
                        <div class="border">
                            <i class="fa fa-calendar" aria-hidden="true"></i>
                            <date-range-picker :options="DRPOption" v-model="dateRange" class="border-0" type="search" id="filterInput"></date-range-picker>
                        </div>
                        <b-input-group-append>
                            <b-button :disabled="!dateRange" @click="dateRange = ''">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
                <b-col></b-col>
                <b-col></b-col>
            </b-row>

            <b-row>
                <b-col>
                <label class="mt-2">Current page total: ${{ parseFloat(totalPrice).toFixed(2) }}</label>
                </b-col>
                <b-col></b-col>
                <b-col></b-col>
            </b-row>

            <b-row>
                <b-table
                        id="table"
                        ref="table"
                        fixed
                        hover
                        class="table"
                        v-model="currentItems"
                        :current-page="currentPage"
                        :items="items"
                        :fields="fields"
                        :per-page="5"
                        :filter="dateRange"
                        :filter-function="filterTable"
                        @filtered="onFiltered"
                        @context-changed="updateTotalPrice"
                >
                </b-table>
            </b-row>

            <b-row align-h="center" align-v="center" >
                <b-col>total {{totalRows}} result(s)</b-col>
                <b-col>
                    <b-pagination
                            v-model="currentPage"
                            :total-rows="totalRows"
                            :per-page="perPage"
                            align="fill"
                            size="sm"
                    ></b-pagination>
                </b-col>
                <b-col>

                </b-col>
            </b-row>

            <b-row>
                <b-col></b-col>
                <b-col></b-col>
                <b-col>
                    <div class="input-group mb-"  style="margin-top: 10px" >
                        <div class="input-group-prepend">
                            <span class="input-group-text">Go to</span>
                        </div>
                        <b-form-input class="form-group w-25" v-model="goto" type="number" @keydown.enter.native="gotoPage"></b-form-input>
                        <div class="input-group-append">
                            <span class="input-group-text">/{{Math.ceil(totalRows/5)}}</span>
                        </div>
                    </div>
                </b-col>
                <b-col></b-col>
                <b-col></b-col>
            </b-row>

        </b-container>

        <div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import moment from 'moment'
    import '@/assets/font-awesome-4.7.0/css/font-awesome.css'

    export default {
        data() {
            return {
                currentItems: null,
                searchText: ' ',
                dateRange: null,
                goto: 1,
                totalPrice: 0.0,
                items: [],
                totalRows: 0,
                currentPage: 1,
                perPage: 5,
                filterOn:['id'],
                fields:[
                    {key:'order_name', label: 'Order name',thStyle:{width:'10%' },tdClass:'align-middle text-left'},
                    {key:'company_name', label: 'Customer Company',thStyle:{width:'20%'},tdClass:'align-middle text-left'},
                    {key:'name', label: 'Customer name',tdClass:'align-middle text-left'},
                    {key:'date', label: 'Order date', sortable: true, sortDirection: 'desc',tdClass:'align-middle text-left',formatter:value => {return this.dateFormatter(value)}},
                    {key:'delivered_total', label: 'Delivered Amount',thStyle:{width:'20%'},tdClass:'align-middle text-left',formatter:value => {return this.priceFormatter(value)}},
                    {key:'order_total', label: 'Total Amount',thStyle:{width:'20%'},tdClass:'align-middle text-left',formatter:value => {return this.priceFormatter(value)}}
                ],
                DRPOption:{

                    locale: {
                        format: '    MMM DD     '
                    }}
            }
        },
        name: "Main",
        methods:{
            updateTotalPrice(){ // when table context changed invoke this method to update the total price
                this.totalPrice=0.0
                this.currentItems.forEach(obj =>{
                    this.totalPrice += parseFloat(obj.order_total)
                })
            },
            dateFormatter(value){ // format the date in "Order column"
                let date = moment(value)
                return `${date.format('MMM Do, HH:mm A')}`
            },
            priceFormatter(value){ // add a dollar sign before price text
                return `$ ${value.toFixed(2)}`;
            },
            filterTable(row,dateRange) { // filter table by order time
                let startDate = moment(dateRange[0],"DD/MM/YYYY");
                let endDate = moment(dateRange[1],"DD/MM/YYYY").add('1','days');
                let targetDate = moment(row.date);
                return targetDate >= startDate && targetDate <= endDate;
            },
            onFiltered(row){ // table filtered event handler
                this.updateTotalPrice()
                this.totalRows = row.length;
            },
            async searchOrder() { // make api call
                await axios
                    .get('http://localhost:8888/orders/'+ encodeURIComponent(this.searchText)) // encode string for url
                    .then(response => {
                        this.items = response.data;
                        this.items.shift()
                        this.totalRows =this.items.length
                    })
                this.updateTotalPrice();
            },
            gotoPage(){
                if (this.goto>this.totalRows){
                    this.currentPage=this.totalRows
                } else {
                    this.currentPage=this.goto
                }
            }
        }

    }
</script>

<style scoped>
    .b-container{
        max-width:1250px
    }
    .table th{
        vertical-align: middle;
    }
</style>