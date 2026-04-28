import { getAllPosts, type Post } from '@/lib/posts';
import { formatMonthLabel, monthKey } from '@/lib/date';
import Nav from '@/components/Nav';
import ProfileHeader from '@/components/ProfileHeader';
import MonthAnchor from '@/components/MonthAnchor';
import PostCard from '@/components/PostCard';
import Footer from '@/components/Footer';

type MonthGroup = {
  key: string;
  label: string;
  posts: Post[];
};

function groupByMonth(posts: Post[]): MonthGroup[] {
  const groups: MonthGroup[] = [];
  for (const post of posts) {
    const key = monthKey(post.date);
    const last = groups[groups.length - 1];
    if (last && last.key === key) {
      last.posts.push(post);
    } else {
      groups.push({ key, label: formatMonthLabel(post.date), posts: [post] });
    }
  }
  return groups;
}

export default function HomePage() {
  const posts = getAllPosts();
  const groups = groupByMonth(posts);

  return (
    <>
      <Nav />
      <ProfileHeader />

      <main id="section-timeline-feed" className="bg-surface-feed">
        {posts.length === 0 ? (
          <section
            id="section-empty-state"
            className="py-20 text-center text-ink-muted"
          >
            <div className="mx-auto max-w-content px-6">
              <p>아직 작성된 포스트가 없습니다.</p>
            </div>
          </section>
        ) : (
          <div className="mx-auto max-w-content px-6 pt-12 pb-[120px]">
            {groups.map((group, idx) => (
              <section key={group.key} aria-label={group.label}>
                <MonthAnchor label={group.label} first={idx === 0} />
                {group.posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </section>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
