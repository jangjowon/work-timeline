import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { profile } from '@/lib/profile';

function hasAvatarFile(publicPath: string): boolean {
  try {
    const abs = path.join(process.cwd(), 'public', publicPath.replace(/^\//, ''));
    return fs.existsSync(abs);
  } catch {
    return false;
  }
}

export default function ProfileHeader() {
  const avatarExists = hasAvatarFile(profile.avatar);

  return (
    <header
      id="section-profile-header"
      className="border-b border-line bg-surface-profile"
    >
      <div className="mx-auto max-w-content px-6 pt-14 pb-9 sm:pt-20 sm:pb-12">
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-14">
          {/* 좌측: 아바타 + 이름 + 태그라인 */}
          <div className="flex flex-col">
            <div className="mb-6 h-24 w-24 overflow-hidden rounded-full border border-line bg-surface-muted">
              {avatarExists && (
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  width={96}
                  height={96}
                  priority
                  className="h-full w-full object-cover object-center"
                />
              )}
            </div>
            <h1 className="mb-2 font-serif text-[26px] font-bold leading-tight tracking-tight sm:text-[32px]">
              {profile.name}
            </h1>
            <p className="text-[16px] text-ink-secondary sm:text-[17px]">
              {profile.tagline}
            </p>
          </div>

          {/* 우측: 약력 */}
          <div className="flex flex-col gap-2.5 border-t border-line pt-6 text-[15px] leading-relaxed md:border-t-0 md:pt-0">
            {profile.bio.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-[70px_1fr] items-baseline gap-3 sm:grid-cols-[90px_1fr] sm:gap-4"
              >
                <div className="text-[13px] font-semibold tracking-wide text-accent">
                  {item.year}
                </div>
                <div className="text-ink-secondary">
                  {item.org ? (
                    <>
                      <strong className="font-semibold text-ink-primary">
                        {item.org}
                      </strong>
                      {' · '}
                      {item.detail}
                    </>
                  ) : (
                    item.detail
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
