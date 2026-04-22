import { lessonCategories, glossary, tips, getLevelColor } from "@/lib/learn-data"
import { ExternalLinkIcon } from "@/components/Icons"

export default function LearnPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#BFD8F2]">Financial Literacy</h1>
        <p className="text-[#7A8FA3] mt-1">Master money management with bite-sized lessons</p>
      </div>

      {/* Daily Tip */}
      <div className="p-6 bg-[#1F7A8C]/10 border border-[#1F7A8C]/30 rounded-2xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#1F7A8C]/20 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BFD8F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.663 17h4.673M12 3v1M6.343 4.343l-.707-.707M18.364 4.343l.707-.707M12 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-[#BFD8F2] mb-1">Daily Financial Tip</h3>
            <p className="text-[#E2E6F3]">Pay yourself first - Automate your savings and investments before spending on wants.</p>
          </div>
        </div>
      </div>

      {/* Lesson Categories */}
      <div className="grid md:grid-cols-2 gap-6">
        {lessonCategories.map((category, i) => (
          <div key={i} className="p-6 bg-[#04384D] border border-[#1F7A8C] rounded-2xl">
            <h3 className="text-lg font-semibold mb-4 text-[#BFD8F2]">{category.title}</h3>
            <div className="space-y-3">
              {category.lessons.map((lesson, j) => (
                <a
                  key={j}
                  href={lesson.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-[#022B3B] rounded-xl hover:bg-[#06455C] transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1F7A8C]/20 flex items-center justify-center">
                      <ExternalLinkIcon />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-[#E2E6F3] group-hover:text-[#BFD8F2] transition-colors">{lesson.title}</p>
                      <span className="text-xs text-[#7A8FA3]">{lesson.readTime} read</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${getLevelColor(lesson.level)}`}>
                    {lesson.level}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Glossary Section */}
      <div className="p-6 bg-[#04384D] border border-[#1F7A8C] rounded-2xl">
        <h3 className="text-lg font-semibold mb-4 text-[#BFD8F2]">Financial Glossary</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {glossary.map((item, i) => (
            <div key={i} className="p-4 bg-[#022B3B] rounded-xl">
              <h4 className="font-semibold text-[#BFD8F2] mb-1">{item.term}</h4>
              <p className="text-sm text-[#7A8FA3]">{item.definition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips Grid */}
      <div className="p-6 bg-[#04384D] border border-[#1F7A8C] rounded-2xl">
        <h3 className="text-lg font-semibold mb-4 text-[#BFD8F2]">Quick Financial Rules</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-[#022B3B] rounded-xl">
              <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#1F7A8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-sm text-[#E2E6F3]">{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
