// interface IContributorRequestList {

// }

interface IRecruitCard {
  id: string;
  created_at: string;
  title: string;
  content: string;
  link: string;
  like: number;
  view: number;
  author: { name: string };
  contributor_group: {
    max_contributor_count: number;
    contributor_count: number;
    novels: { title: string };
  };
}
