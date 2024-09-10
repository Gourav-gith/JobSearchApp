
export interface PostJobStep1Response {
    status?:  number;
    message?: string;
    data?:    postJobStep1[];
}

export interface postJobStep1 {
    id?:                           number;
    recruiter_id?:                 number;
    job_title?:                    string;
    slug?:                         string;
    industry_id?:                  number;
    industry_name?:                string;
    functional_area_id?:           number;
    functional_area?:              string;
    min_experience_id?:            number;
    min_experience?:               number;
    max_experience_id?:            number;
    max_experience?:               number;
    ctc_type?:                     string;
    fixed_ctc?:                    string;
    min_ctc?:                      string;
    max_ctc?:                      string;
    educational_qualification_id?: string;
    core_competency_id?:string
    work_level_competency_id?: string;
    job_location_id?:string;
    role_specific?:string;
    num_open_position?:            number;
    job_post_stage?:               number;
    status_id?:                    number;
    status?:                       string;
    is_published?:                 number;
    view_count?:                   number;
}
export interface IndustryResponse {
    status?:  number;
    message?: string;
    data?:    Industry[];
}

export interface Industry {
    id?:   number;
    type?: Type;
    name?: string;
}

export type Type = "industry";

export interface FunctionalAreasResponse {
    status?:  number;
    message?: string;
    data?:    FunctionalAreas[];
}

export interface FunctionalAreas {
    id?:   number;
    name?: string;
}
export interface LocationResponse {
    status?:  number;
    message?: string;
    data?:    Location[];
}

export interface Location {
    id?:        number;
    city_name?: string;
}
export interface ExperienceResponse {
    status?:  number;
    message?: string;
    data?:    Experience[];
}

export interface Experience {
    id?:   number;
    type?: string;
    min?:  number;
    max?:  number;
}
export interface PreferdSkkilsResponse {
    status?:  number;
    message?: string;
    data?:    PreferdSkills[];
}

export interface PreferdSkills {
    id?:   number;
    type?: Type;
    name?: string;
}

export interface WorkLevelResponse {
    status?:  number;
    message?: null;
    data?:    WorkLevel[];
}

export interface WorkLevel {
    id?:   number;
    name?: string;
}
export interface CoreCompetencyResponse {
    status?:  number;
    message?: null;
    data?:    CoreCompetency[];
}

export interface CoreCompetency {
    id?:                       number;
    work_level_competency_id?: string;
    name?:                     string;
    slug?:                     string;
}
export interface LeaderCompetencyResponse {
    status?:  number;
    message?: null;
    data?:    LeaderCompetency[];
}

export interface LeaderCompetency {
    id?:                       number;
    work_level_competency_id?: number;
    name?:                     string;
    slug?:                     string;
}
export interface EducationalQualificationResponse {
    status?:  number;
    message?: string;
    data?:    EducationalQualification[];
}

export interface EducationalQualification {
    id?:   number;
    type?: string;
    name?: string;
}
export interface JobTypeResponse {
    status?:  number;
    message?: string;
    data?:    JobType[];
}

export interface JobType {
    id?:   number;
    type?: string;
    name?: string;
}
export interface PreferdShiftResponse {
    status?:  number;
    message?: string;
    data?:    PreferdShift[];
}

export interface PreferdShift {
    id?:   number;
    type?: string;
    name?: string;
}
export interface PreferdGenderResponse {
    status?:  number;
    message?: string;
    data?:    PreferdGender[];
}

export interface PreferdGender {
    id?:   number;
    type?: string;
    name?: string;
}
export interface WorkmodeResponse {
    status?:  number;
    message?: string;
    data?:    Workmode[];
}

export interface Workmode {
    id?:   number;
    type?: string;
    name?: string;
}

export interface PostjobStep2Response {
    status?:  number;
    message?: string;
    data?:    PostjobStep2;
}

export interface PostjobStep2 {
    id?:                       number;
    job_basic_detail_id?:      number;
    does_reveal_company_name?: number;
    display_company_name?:     string;
    primary_responsibilty?:    string;
    job_description?:          string;
    job_types?:                string[];
    preferred_shifts?:         string[];
    work_place_types?:         string[];
    preferred_gender?:         string[];
    job_post_stage?:           number;
}

export interface ScreenQuestionResponse {
    status?:  number;
    message?: string;
    data?:    ScreenQuestion[];
}

export interface ScreenQuestion {
    id?:          number;
    industry_id?: number;
    question?:    string;
    type?:        string;
    created_at?:  Date;
    updated_at?:  Date;
    industry?:    Industry;
    options?:     OptionElement[];
}

export interface Industry {
    id?:         number;
    // type?:       string;
    name?:       string;
    short_code?: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface OptionElement {
    id?:          number;
    question_id?: number;
    option?:      OptionEnum;
    created_at?:  Date;
    updated_at?:  Date;
}

export type OptionEnum = "Yes" | "No" | "Maybe";

export interface PostJobStep3Response {
    status?:  number;
    message?: string;
    data?:    PostJobStep3[];
}

export interface PostJobStep3 {
    id?:                               number;
    primary_responsibility_detail_id?: number;
    master_question_id?:               null;
    question?:                         string;
    is_mandate?:                       number;
    type?:                             string;
    created_at?:                       Date;
    updated_at?:                       Date;
}

export interface PreviewPostResponse {
    status?:  number;
    message?: string;
    data?:    PreviewPost;
}

export interface PreviewPost {
    id?:                           number;
    job_title?:                    string;
    industry_id?:                  number;
    industry_name?:                string;
    job_description?:              string;
    work_level_competency_name?:   string;
    core_competencies?:            CoreCompetencyElement[];
    job_leadership?:               JobLeadership[];
    job_role_specific?:            JobRoleSpecific[];
    job_location?:                 string[];
    preferred_skills?:             string[];
    job_type?:                     string[];
    preferred_shift?:              string[];
    work_place?:                   string[];
    preferred_gender?:             string[];
    functional_area?:              string;
    min_experience?:               number;
    max_experience?:               number;
    ctc_type?:                     number;
    fixed_ctc?:                    string;
    min_ctc?:                      number;
    max_ctc?:                      number;
    educational_qualification_id?: number;
    educational_qualification?:    string;
    num_open_position?:            number;
    job_post_stage?:               number;
    view_count?:                   number;
    recruiter_id?:                 number;
    first_name?:                   string;
    middle_name?:                  string;
    last_name?:                    string;
    recruiter_role?:               string;
    recruiter_company?:            string;
    about_recruiter?:              string;
    primary_responsibilty?:        string;
    questions?:                    Question[];
}

export interface CoreCompetencyElement {
    id?:                  number;
    job_basic_detail_id?: number;
    core_competency_id?:  number;
    core_competency?:     LeadershipClass;
}

export interface LeadershipClass {
    id?:   number;
    name?: string;
}

export interface JobLeadership {
    id?:                       number;
    job_basic_detail_id?:      number;
    leadership_competency_id?: number;
    leadership?:               LeadershipClass;
}

export interface JobRoleSpecific {
    id?:                  number;
    job_basic_detail_id?: number;
    role_specific?:       string;
}

export interface Question {
    id?:         number;
    question?:   string;
    is_mandate?: number;
    type?:       string;
}

export interface ManagejobResponse {
    status?:  number;
    message?: string;
    data?:    Data;
}

export interface Data {
    job_data?:   Managejob[];
    pagination?: Pagination;
}

export interface Managejob {
    id?:                       number;
    recruiter_id?:             number;
    job_title?:                string;
    job_type?:                 JobTypeElement[] | string;
    slug?:                     string;
    job_locations?:            string[];
    status_id?:                number;
    status?:                   string;
    is_published?:             number;
    view_count?:               number;
    job_post_date?:            string;
    new_applications_count?:   number;
    total_applications_count?: number;
    hired?:                    number;
}

export interface JobTypeElement {
    id?:    number;
    name?:  string;
    pivot?: Pivot;
}

export interface Pivot {
    job_primary_responsibility_detail_id?: number;
    job_type_id?:                          number;
}

export interface Pagination {
    first_page_url?: string;
    from?:           number;
    last_page?:      number;
    last_page_url?:  string;
    next_page_url?:  null;
    path?:           string;
    per_page?:       number;
    prev_page_url?:  null;
    to?:             number;
    total?:          number;
}

export interface JobRoleResponse {
    status?:  number;
    message?: string;
    data?:    JobRole[];
}

export interface JobRole {
    id?:   number;
    type?: Type;
    name?: string;
}

// export type Type = "job_role";

export interface IndustryResponse {
    status?:  number;
    message?: string;
    data?:    Industry[];
}

export interface Industry {
    id?:   number;
    type?: Type;
    name?: string;
}

// export type Type = "industry";

export interface ManagecandidateResponse {
    status?:  number;
    message?: string;
    data?:    Managecandidate;
}

export interface Managecandidate {
    candidates_Counts?: CandidatesCount[];
    job_Application?:   JobApplication;
}

export interface CandidatesCount {
    all_candidates_count?:       number;
    new_candidates_count?:       number;
    shortlist_candidates_Count?: number;
    hold_candidates_Count?:      number;
    rejected_candidates_Count?:  number;
    hired_candidates_Count?:     number;
}

export interface JobApplication {
    current_page?:   number;
    data?:           Datum[];
    first_page_url?: string;
    from?:           number;
    last_page?:      number;
    last_page_url?:  string;
    links?:          Link[];
    next_page_url?:  null;
    path?:           string;
    per_page?:       number;
    prev_page_url?:  null;
    to?:             number;
    total?:          number;
}

export interface Datum {
    id?:                    number;
    job_seeker_id?:         number;
    job_id?:                number;
    application_status_id?: number;
    read_at_by_recruiter?:  null;
    created_at?:            Date;
    application_status?:    ApplicationStatus;
    job_basic_detail?:      JobBasicDetail;
    jobseeker?:             Jobseeker;
}

export interface ApplicationStatus {
    id?:         number;
    type?:       string;
    name?:       string;
    short_code?: string;
}

export interface JobBasicDetail {
    id?:          number;
    job_title?:   string;
    industry_id?: number;
}

export interface Jobseeker {
    id?:                      number;
    first_name?:              string;
    middle_name?:             null;
    last_name?:               string;
    profile_image?:           null;
    professional_details?:    null;
    personal_details?:        null;
    resume?:                  null;
    education_qualification?: null;
}

export interface Link {
    url?:    null | string;
    label?:  string;
    active?: boolean;
}
























