
export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  relatedIds?: string[];
}

export const glossaryData: GlossaryTerm[] = [
  {
    id: 'amendment',
    term: 'Amendment',
    definition: 'A formal change or addition to the Constitution. The amendment process requires approval by two-thirds of both houses of Congress and ratification by three-fourths of state legislatures.',
    relatedIds: ['constitution', 'bill-of-rights'],
  },
  {
    id: 'bill-of-rights-term',
    term: 'Bill of Rights',
    definition: 'The first ten amendments to the Constitution, ratified in 1791, which guarantee fundamental rights and freedoms such as freedom of speech, religion, and the press.',
    relatedIds: ['bill-of-rights', 'freedom-speech', 'freedom-religion'],
  },
  {
    id: 'checks-balances-term',
    term: 'Checks and Balances',
    definition: 'A system that allows each branch of government to limit the powers of the other branches, preventing any one branch from becoming too powerful.',
    relatedIds: ['checks-balances', 'separation-powers'],
  },
  {
    id: 'civic-duty-term',
    term: 'Civic Duty',
    definition: 'The responsibilities of citizens to participate in their government and community, including voting, serving on juries, and staying informed about public issues.',
    relatedIds: ['voting', 'jury-duty', 'civic-participation'],
  },
  {
    id: 'constitution-term',
    term: 'Constitution',
    definition: 'The supreme law of the United States, establishing the framework of the federal government and defining the relationship between the government and the people.',
    relatedIds: ['constitution', 'rule-of-law'],
  },
  {
    id: 'constituency-term',
    term: 'Constituency',
    definition: 'The body of voters in a specified area who elect a representative to a legislative body. Representatives are expected to serve the interests of their constituency.',
    relatedIds: ['legislative'],
  },
  {
    id: 'democracy-term',
    term: 'Democracy',
    definition: 'A system of government in which power is vested in the people, who rule either directly or through freely elected representatives.',
    relatedIds: ['democracy', 'republicanism'],
  },
  {
    id: 'due-process-term',
    term: 'Due Process',
    definition: 'The constitutional guarantee that the government must respect all legal rights owed to a person. It ensures fair treatment through the judicial system.',
    relatedIds: ['bill-of-rights', 'rule-of-law'],
  },
  {
    id: 'electoral-college-term',
    term: 'Electoral College',
    definition: 'The body of electors established by the Constitution that formally elects the President and Vice President of the United States.',
    relatedIds: ['executive', 'constitution'],
  },
  {
    id: 'federalism-term',
    term: 'Federalism',
    definition: 'A system of government in which power is divided between a central authority and constituent political units (states), allowing both to govern within their respective spheres.',
    relatedIds: ['federalism', 'separation-powers'],
  },
  {
    id: 'habeas-corpus-term',
    term: 'Habeas Corpus',
    definition: 'A legal principle that protects against unlawful and indefinite imprisonment, requiring that a person be brought before a court to determine if their detention is lawful.',
    relatedIds: ['bill-of-rights', 'rule-of-law'],
  },
  {
    id: 'impeachment-term',
    term: 'Impeachment',
    definition: 'The process by which a legislative body brings charges against a government official for misconduct. The House of Representatives has the sole power to impeach, while the Senate conducts the trial.',
    relatedIds: ['legislative', 'executive', 'checks-balances'],
  },
  {
    id: 'judicial-review-term',
    term: 'Judicial Review',
    definition: 'The power of courts to examine laws and government actions to determine whether they comply with the Constitution, established by the Supreme Court in Marbury v. Madison (1803).',
    relatedIds: ['judicial', 'constitution'],
  },
  {
    id: 'preamble-term',
    term: 'Preamble',
    definition: 'The introduction to the Constitution that begins with "We the People" and outlines the purposes and guiding principles of the document.',
    relatedIds: ['constitution'],
  },
  {
    id: 'ratification-term',
    term: 'Ratification',
    definition: 'The formal approval process by which the Constitution or an amendment becomes law, requiring approval by a specified number of states.',
    relatedIds: ['constitution', 'amendment'],
  },
  {
    id: 'republic-term',
    term: 'Republic',
    definition: 'A form of government in which the country is considered a "public matter" and officials are elected to represent the citizens rather than rule by inherited right.',
    relatedIds: ['republicanism', 'democracy'],
  },
  {
    id: 'separation-powers-term',
    term: 'Separation of Powers',
    definition: 'The division of government responsibilities into distinct branches (Legislative, Executive, and Judicial) to limit any one branch from exercising the core functions of another.',
    relatedIds: ['separation-powers', 'legislative', 'executive', 'judicial'],
  },
  {
    id: 'veto-term',
    term: 'Veto',
    definition: 'The constitutional power of the President to refuse to approve a bill passed by Congress, which can be overridden by a two-thirds vote in both houses.',
    relatedIds: ['executive', 'legislative', 'checks-balances'],
  },
  {
    id: 'bicameral-term',
    term: 'Bicameral',
    definition: 'A legislature with two chambers or houses. The U.S. Congress is bicameral, consisting of the Senate and the House of Representatives.',
    relatedIds: ['legislative'],
  },
  {
    id: 'cabinet-term',
    term: 'Cabinet',
    definition: 'A group of the President\'s top advisors, consisting of the heads of executive departments who help implement federal laws and policies.',
    relatedIds: ['executive'],
  },
  {
    id: 'census-term',
    term: 'Census',
    definition: 'An official count of the population conducted every ten years, used to determine representation in the House of Representatives and allocate federal funds.',
    relatedIds: ['legislative'],
  },
  {
    id: 'civil-liberties-term',
    term: 'Civil Liberties',
    definition: 'Fundamental individual rights protected by law from government interference, including freedom of speech, religion, and the right to due process.',
    relatedIds: ['bill-of-rights', 'freedom-speech', 'freedom-religion'],
  },
  {
    id: 'civil-rights-term',
    term: 'Civil Rights',
    definition: 'The rights of citizens to political and social freedom and equality, particularly protection from discrimination based on race, gender, religion, or other characteristics.',
    relatedIds: ['life-liberty'],
  },
  {
    id: 'common-good-term',
    term: 'Common Good',
    definition: 'The benefit or interests of all members of a community, often used to justify government action that serves the collective welfare.',
    relatedIds: ['community-common-good', 'common-good'],
  },
  {
    id: 'executive-order-term',
    term: 'Executive Order',
    definition: 'A directive issued by the President that manages operations of the federal government and has the force of law.',
    relatedIds: ['executive'],
  },
  {
    id: 'filibuster-term',
    term: 'Filibuster',
    definition: 'A legislative tactic used in the Senate to delay or prevent a vote on a bill by extending debate indefinitely.',
    relatedIds: ['legislative'],
  },
  {
    id: 'gerrymandering-term',
    term: 'Gerrymandering',
    definition: 'The practice of drawing electoral district boundaries to favor one political party or group over another.',
    relatedIds: ['legislative'],
  },
  {
    id: 'grassroots-term',
    term: 'Grassroots',
    definition: 'Political activity or movements that originate from ordinary citizens at the local level rather than from political leaders or organizations.',
    relatedIds: ['civic-participation', 'local-movements'],
  },
  {
    id: 'incumbent-term',
    term: 'Incumbent',
    definition: 'The current holder of a political office, often having advantages in reelection campaigns due to name recognition and access to resources.',
    relatedIds: ['voting'],
  },
  {
    id: 'jurisdiction-term',
    term: 'Jurisdiction',
    definition: 'The official power to make legal decisions and judgments, or the geographic area over which such authority extends.',
    relatedIds: ['judicial', 'federalism'],
  },
  {
    id: 'lobby-term',
    term: 'Lobby',
    definition: 'To seek to influence legislators on behalf of a particular cause or interest group, or the groups that engage in such activity.',
    relatedIds: ['legislative'],
  },
  {
    id: 'majority-term',
    term: 'Majority',
    definition: 'More than half of a total, often used to describe the number of votes needed to pass legislation or the political party with the most seats in a legislative body.',
    relatedIds: ['legislative'],
  },
  {
    id: 'minority-rights-term',
    term: 'Minority Rights',
    definition: 'Protections for groups that are not part of the majority, ensuring they have equal rights and are not subject to the tyranny of the majority.',
    relatedIds: ['republicanism', 'civil-rights-term'],
  },
  {
    id: 'naturalization-term',
    term: 'Naturalization',
    definition: 'The legal process by which a foreign citizen becomes a citizen of the United States.',
    relatedIds: ['immigration'],
  },
  {
    id: 'partisan-term',
    term: 'Partisan',
    definition: 'Strong support for a particular political party or cause, often characterized by unwavering loyalty regardless of specific issues.',
    relatedIds: ['democratic-party', 'republican-party'],
  },
  {
    id: 'precedent-term',
    term: 'Precedent',
    definition: 'A legal decision or case that serves as an authoritative example for future similar cases, particularly important in the judicial system.',
    relatedIds: ['judicial'],
  },
  {
    id: 'sovereignty-term',
    term: 'Sovereignty',
    definition: 'Supreme power or authority, particularly the authority of a state to govern itself or another state.',
    relatedIds: ['federalism', 'national-interest'],
  },
  {
    id: 'suffrage-term',
    term: 'Suffrage',
    definition: 'The right to vote in political elections, historically expanded over time to include previously excluded groups.',
    relatedIds: ['voting'],
  },
  {
    id: 'supremacy-clause-term',
    term: 'Supremacy Clause',
    definition: 'Article VI of the Constitution establishing that federal law takes precedence over state laws when there is a conflict.',
    relatedIds: ['constitution', 'federalism'],
  },
  {
    id: 'term-limits-term',
    term: 'Term Limits',
    definition: 'Legal restrictions on the number of terms an elected official may serve in a particular office.',
    relatedIds: ['executive', 'legislative'],
  },
  {
    id: 'unicameral-term',
    term: 'Unicameral',
    definition: 'A legislature with a single chamber or house, in contrast to the bicameral U.S. Congress.',
    relatedIds: ['legislative'],
  },
].sort((a, b) => a.term.localeCompare(b.term));
