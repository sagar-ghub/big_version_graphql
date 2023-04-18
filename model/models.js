const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,

  GraphQLList,
  GraphQLScalarType,
  GraphQLFloat,
} = require("graphql");
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

const PermissionType = new GraphQLObjectType({
  name: "Permission",
  fields: () => ({
    permission_name: { type: GraphQLString },
  }),
});

const TemplateType1 = new GraphQLObjectType({
  name: "Template",
  fields: () => ({
    template_id: { type: GraphQLInt },
    template_name: { type: GraphQLString },
    is_default: { type: GraphQLInt },
    is_active: { type: GraphQLInt },
    created_at: { type: GraphQLString },
  }),
});
const CommissionType = new GraphQLObjectType({
  name: "Commission",
  fields: {
    type: { type: GraphQLInt },
    amount: { type: GraphQLFloat },
    charge: { type: GraphQLFloat },
    max_recharge: { type: GraphQLInt },
    min_recharge: { type: GraphQLInt },
    from_commission: { type: GraphQLInt },
  },
});

const OperatorType = new GraphQLObjectType({
  name: "Operator",
  fields: {
    operator_id: { type: GraphQLInt },
    service_id: { type: GraphQLInt },
    operator_name: { type: GraphQLString },
    operator_code: { type: GraphQLString },
    operator_type: { type: GraphQLString },
    operator_category: { type: GraphQLInt },
    operator_recharge_plan: { type: new GraphQLList(GraphQLString) },
    operator_min_recharge_amount: { type: GraphQLInt },
    operator_max_recharge_amount: { type: GraphQLInt },
    operator_provider: { type: new GraphQLList(GraphQLInt) },
    is_active: { type: GraphQLInt },
    operator_image: { type: GraphQLString },
    update_at: { type: GraphQLString },
    update_by: { type: GraphQLInt },
    commission: { type: new GraphQLList(CommissionType) },
    lapu_commission: { type: new GraphQLList(CommissionType) },
  },
});

const TemplateType = new GraphQLObjectType({
  name: "Template",
  fields: {
    template_id: { type: GraphQLInt },
    template_name: { type: GraphQLString },
    is_default: { type: GraphQLInt },
    is_active: { type: GraphQLInt },
    created_at: { type: GraphQLString },
    commissions: { type: new GraphQLList(OperatorType) },
  },
});
// const TemplateSingleType = new GraphQLObjectType({
//   name: "TemplateSingle",
//   fields: () => ({
//     template_id: { type: GraphQLInt },
//     template_name: { type: GraphQLString },
//     is_default: { type: GraphQLInt },
//     is_active: { type: GraphQLInt },
//     created_at: { type: GraphQLString },
//     comissions: {
//       type: new GraphQLList({
//         type: new GraphQLObjectType({
//           name: "Commission",
//           fields: () => ({
//             operator_id: { type: GraphQLInt },
//             service_id: { type: GraphQLInt },
//             operator_name: { type: GraphQLString },
//             operator_code: { type: GraphQLString },
//             operator_type: { type: GraphQLString },
//             operator_category: { type: GraphQLString },
//             operator_recharge_plan: new GraphQLList({
//               type: new GraphQLObjectType({
//                 name: "RechargePlan",
//                 fields: () => ({
//                   operator_id: { type: GraphQLInt },
//                   amount: { type: GraphQLInt },
//                   description: { type: GraphQLString },
//                 }),
//               }),
//             }),
//             operator_min_recharge_amount: { type: GraphQLInt },
//             operator_max_recharge_amount: { type: GraphQLInt },
//           }),
//         }),
//       }),
//     },
//   }),
// });
module.exports = {
  PartnerType,
  PermissionType,
  TemplateType,
  // TemplateSingleType,
};
