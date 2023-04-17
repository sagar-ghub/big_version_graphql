const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,

  GraphQLList,
  GraphQLScalarType,
} = require("graphql");
const network = require("../utils/network");

const axios = require("axios");
const BASE_URL = "https://stagev2a.rechargkit.biz";
const findData = () => {
  return "calculation result";
};
const MNPtype = new GraphQLObjectType({
  name: "MNP",
  //We are wrapping fields in the function as we don’t want to execute this until
  //everything is inilized. For example below code will throw an error AuthorType not
  //found if not wrapped in a function
  fields: () => ({
    id: { type: GraphQLID },
    mobile: { type: GraphQLString },
    operator_id: { type: GraphQLString },
    mobile_code: { type: GraphQLString },
    circle_id: { type: GraphQLString },
    circle_code: { type: GraphQLString },
    is_port: { type: GraphQLString },
  }),
});
const PlanType = new GraphQLScalarType({
  name: "PlanType",
  description: "A custom scalar type",
  serialize(value) {
    return value;
  },
  parseValue(value) {
    return JSON.parse(value);
  },
  parseLiteral(ast) {
    // Convert incoming AST to JSON
    return JSON.parse(ast.value);
  },
});

const getPlan = async (args) => {
  console.log(args);
  console.log(args.amount);
  const url = args.amount
    ? `${BASE_URL}mobile/checkAmount?operator_id=${args.operator_id}&circle_id=${args.circle_id}&amount=${args.amount}`
    : `${BASE_URL}mobile/checkAmount?operator_id=${args.operator_id}&circle_id=${args.circle_id}`;

  console.log(url);
  const { data } = await axios(
    // `${BASE_URL}mobile/checkAmount?operator_id=${args.operator_id}&circle_id=${args.circle_id}`,
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + args.token,
      },
    }
  );
  // console.log("da", data);

  return data.data;
};

//design a mutation to add money to wallet in userschema

const SpecialPlanType = new GraphQLObjectType({
  name: "SpecialPlan",
  fields: () => ({
    amount: { type: GraphQLString },
    validity: { type: GraphQLString },
    sms: { type: GraphQLString },
    is_valid: { type: GraphQLString },
    talktime: { type: GraphQLString },
    disclaimer: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

const PartnerType = new GraphQLObjectType({
  name: "Partner",
  fields: () => ({
    member_id: { type: GraphQLID },
    member_no: { type: GraphQLString },
    member_password: { type: GraphQLString },
    member_business_type: { type: GraphQLString },
    member_ip_address: { type: new GraphQLList(GraphQLString) },
    member_callback_url: { type: GraphQLString },
    memberdmr_callback_url: { type: GraphQLString },
    member_domain: { type: GraphQLString },
    member_domain_code: { type: GraphQLString },
    irctc_retailer_counter: { type: GraphQLInt },
    member_api_type: { type: GraphQLInt },
    member_api_token: { type: GraphQLString },
    member_type: { type: GraphQLInt },
    member_firm_name: { type: GraphQLString },
    member_firm_address: { type: GraphQLString },
    member_contact_name: { type: GraphQLString },
    member_mobile: { type: GraphQLString },
    member_email: { type: GraphQLString },
    member_service_emails: { type: GraphQLString },
    member_alt_mobile: { type: GraphQLString },
    member_state: { type: GraphQLString },
    member_city: { type: GraphQLString },
    member_pin: { type: GraphQLString },
    member_role: { type: GraphQLString },
    member_kyc: { type: GraphQLString },
    member_photo: { type: GraphQLString },
    member_wallet: { type: GraphQLString },
    member_min_wallet_balance: { type: GraphQLInt },
    member_dmr_wallet: { type: GraphQLInt },
    member_min_dmr_wallet_balance: { type: GraphQLInt },
    member_service_profile: { type: GraphQLInt },
    member_daily_recharge_report: { type: GraphQLInt },
    member_active: { type: GraphQLInt },
    member_created_date: { type: GraphQLString },
    member_created_by: { type: GraphQLInt },
    member_update_date: { type: GraphQLString },
    member_update_by: { type: GraphQLInt },
    member_alert_wallet_balance: { type: GraphQLInt },
    member_alert_dmr_wallet_balance: { type: GraphQLInt },
    package_refund_callback_url: { type: GraphQLString },
    member_irctc_authcheck: { type: GraphQLString },
    member_irctc_ordercheck: { type: GraphQLString },
    member_irctc_cancelorder: { type: GraphQLString },
    is_lapu_acess: { type: GraphQLInt },
    provider_strategy: { type: GraphQLInt },
    is_special_recharge: { type: GraphQLInt },
    last_login: { type: GraphQLString },
    member_permission: { type: new GraphQLList(GraphQLString) },
    is_phone_verified: { type: GraphQLInt },
    commission_template_id: { type: GraphQLInt },
    member_direct: { type: GraphQLString },
    last_ip_address: { type: GraphQLString },
  }),
});

const PartnerListType = new GraphQLObjectType({
  name: "PartnerList",
  fields: () => ({
    partner: { type: new GraphQLList(PartnerType) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => findData(),
    },
    PartnerList: {
      type: PartnerListType,
      args: { token: { type: GraphQLString } },
      async resolve(parent, args) {
        const data = await network.getNetwork("/member/partners", args.token);
        console.log("asd", data.partners[0]);
        return data.partners;
      },
    },
    PlanAmount: {
      type: SpecialPlanType,
      args: {
        token: { type: GraphQLString },
        operator_id: { type: GraphQLString },
        circle_id: { type: GraphQLString },
        amount: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log(args);
        const data = await getPlan(args);

        return data;
      },
    },

    Plans: {
      type: PlanType,
      args: {
        token: { type: GraphQLString },
        operator_id: { type: GraphQLString },
        circle_id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log(args);
        const data = await getPlan(args);

        return data;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  // query: new GraphQLObjectType({
  //   name: "query",
  //   fields: {
  //     hello: {
  //       type: GraphQLString,
  //       resolve: () => findData(),
  //     },
  //   },
  // }),
});

module.exports = { schema };
