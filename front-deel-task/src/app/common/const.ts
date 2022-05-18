export class Const {
  public static readonly routes = {
    login: 'login',
    forgot: 'forgot',
    reset: 'reset',
    home: '',
    project: {
      path: 'project',
      list: 'project/list',
      roles: 'project/role',
      team: 'project/team',
      workload: 'project/workload',
    },
    staff: {
      path: 'staff',
      list: 'staff/list',
      assignment: 'staff/assignment',
      outlook: 'staff/outlook',
      workload: 'staff/workload',
    },
    wifa: {
      path: 'wifa',
    },
    setting: {
      path: 'setting',
      user: 'setting/user',
    },
  };
  public static readonly paths = {
    auth: '/auth/',
  };
  public static readonly masters = {
    ProjectStatus: 'PROJECT_STATUS',
    OfficeList: 'OFFICE',
    Customers: 'CUSTMER',
    Contacts: 'CONTACTS',
    CustomLabel: 'CUSTOM_LABEL',
    Values: {
      INPROGRESS: 'In Progress',
      PROPOSAL: 'Proposal',
    },
    CATEGORY: 'CATEGORY',
    CERTIFICATIONSKILLS: 'CERTIFICATION_SKILLS',
    EXPERIENCE: 'EXPERIENCE',
    PROJECTGROUP: 'PROJECT_GROUP',
    PROJECTTYPE: 'PROJECT_TYPE',
    REGION: 'REGION',
    STAFFGROUP: 'STAFF_GROUP',
    STAFFROLE: 'STAFF_ROLE',
    STAFFSTATUS: 'STAFF_STATUS',
    TIMELINE: 'TIMELINE_TYPE',
    TIMELINE_DATE: 'TIMELINE_DATE',
    COUNTRY: 'COUNTRY',
    STATE: 'STATE',
    YEAR: 'YEAR',
    ACCESSROLE: 'ACCESS_ROLE',
    ALLOCATION_STATUS: 'ALLOCATION_STATUS',
  };
  public static readonly label = {
    dashboard: {
      module: 'Dashboard',
      Proposal: 'Proposal',
      ProposalDesc: 'ProposalDesc',
      InProgress: 'InProgress',
      InProgressDesc: 'InProgressDesc',
      OpenRole: 'OpenRole',
      OpenRoleDesc: 'OpenRoleDesc',
      AssignmentGap: 'AssignmentGap',
      AssignmentGapDesc: 'AssignmentGapDesc',
      AllocationAlert: 'AllocationAlert',
      AllocationAlertDesc: 'AllocationAlertDesc',
      Bench: 'Bench',
      BenchDesc: 'BenchDesc',
      ProjectsEnding: 'ProjectsEnding',
      ProjectEndingDesc: 'ProjectsEndingDesc',
    },
    project: {
      module: 'Project',
    },
    staff: {
      module: 'Staff',
    },
    assignment: {
      module: 'Assignment',
    },
    legend: {
      module: 'LEGEND',
    },
  };
  public static readonly filters = {
    ProjectStatus: 'status',
    StaffStatus: 'staffStatus',
    StaffAlert: 'alert',
    Location: 'office',
    StartDate: 'startDate',
    EndDate: 'endDate',
    ByDates: 'ByDates',
    AllDates: 'AllDates',
    startDateBetween: 'startBetween',
    endDateBetween: 'endBetween',
    StaffRole: 'role',
    StaffGroup: 'group',
    Year: 'Year',
    Timeline: 'Timeline',
    ProjectGroup: 'ProjectGroup',
    OpenRoles: 'OpenRoles',
    StartIn: 'StartIn',
    EndsIn: 'EndIn',
  };
  public static readonly staffAlert = [
    { key: 'Gap', value: 'Assignment Gap' },
    { key: 'Alert', value: 'Allocation Alert' },
    { key: 'Bench', value: 'Bench' },
  ];
  public static readonly Admin = 'ADMIN';

  public static readonly lazyLoadedScreens = {
    staff: {
      list: 'list',
      assignment: 'assignment',
      outlook: 'outlook',
      workload: 'workload',
    },
    project: {
      list: 'list',
      role: 'role',
      team: 'team',
      workload: 'workload',
    },
    wifa: {
      main: 'main',
      menu: 'menu',
      newProject: 'new-project',
      potentialProject: 'potential-project',
      capacityForecast: 'capacity-forecast'
    },
  };
}

export enum TimelineOptions {
  ThisWeek = 'This Week',
  UpcomingWeekk = 'Upcoming Weekkkkkk',
  Days30 = '30 Days',
  Days60 = '60 Days',
  Days90 = '90 Days',
  All = 'All',
}
