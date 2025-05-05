import MobileTabHeader from '@/components/molecules/MobileTabHeader';
import ApplicantAuthor from '@/components/organisms/ApplicantAuthor';
import ParticipatingAuthors from '@/components/organisms/ParticipatingAuthors';
import WorkSpaceTabHeader from '@/components/organisms/WorkSpaceTabHeader';
import { IApplicantAuthor, IParticipatingAuthor } from '@/shared/interface/author';
import React from 'react';

interface ManagementTemplateProps {
  applicantAuthor: IApplicantAuthor[];
  participatingAuthors: IParticipatingAuthor[];
  recruitment: { id: string };
}

const ManagementTemplate = ({
  applicantAuthor,
  participatingAuthors,
  recruitment,
}: ManagementTemplateProps) => {
  return (
    <div>
      <div className="sm:hidden">
        <MobileTabHeader currentTab="management" />
      </div>
      <div className="hidden sm:block">
        <WorkSpaceTabHeader currentTab="management" />
      </div>

      <div className="mt-[8px] w-full flex flex-col items-center justify-center gap-[16px]">
        <ParticipatingAuthors participatingAuthors={participatingAuthors} />
        <ApplicantAuthor applicantAuthor={applicantAuthor} recruitment={recruitment} />
      </div>
    </div>
  );
};

export default ManagementTemplate;
