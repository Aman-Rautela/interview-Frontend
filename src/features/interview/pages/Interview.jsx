import React, { useState } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hook/useInterview.js'
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from 'react-router';

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className={`q-card ${open ? 'is-open' : ''}`}>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
                <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--intention'>Intention</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>Day {day.day}</span>
            <h3 className='roadmap-day__focus'>{day.focus}</h3>
        </div>
        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, i) => (
                <li key={i}>
                    <span className='roadmap-day__bullet' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, loading, getResumePdf } = useInterview()
    const { handleLogout } = useAuth()

    const navigate = useNavigate();

    if (loading || !report) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }
    const logoHandle = (e) => {
        e.preventDefault();
        navigate("/");
    }
    const scoreColor =
        report.matchScore >= 80 ? 'high' :
        report.matchScore >= 60 ? 'mid' : 'low'

    const circumference = 2 * Math.PI * 34
    const offset = circumference - (report.matchScore / 100) * circumference

    return (
        <div className='interview-page'>
            <div className='interview-layout'>

                {/* ── Left Nav ── */}
                <nav className='interview-nav'>

                    {/* Brand */}
                    <div className='interview-nav__brand'>
                        <span className='brand-icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        </span>
                        <span onClick={logoHandle} className='brand-name'>PrepAI</span>
                    </div>

                    {/* Nav items */}
                    <span className='interview-nav__label'>Sections</span>
                    {NAV_ITEMS.map(item => (
                        <button
                            key={item.id}
                            className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                            onClick={() => setActiveNav(item.id)}
                        >
                            <span className='interview-nav__icon'>{item.icon}</span>
                            {item.label}
                        </button>
                    ))}

                    {/* Bottom actions */}
                    <div className='interview-nav__actions'>
                        <button
                            className='interview-nav__item interview-nav__item--download'
                            onClick={() => getResumePdf(report._id.toString())}
                        >
                            <span className='interview-nav__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            </span>
                            Download Resume
                        </button>
                        <button
                            className='interview-nav__item interview-nav__item--logout'
                            onClick={handleLogout}
                        >
                            <span className='interview-nav__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                            </span>
                            Logout
                        </button>
                    </div>
                </nav>

                <div className='interview-divider' />

                {/* ── Center Content ── */}
                <main className='interview-content'>
                    {activeNav === 'technical' && (
                        <section>
                            <div className='content-header'>
                                <h2>Technical Questions</h2>
                                <span className='content-header__count'>{report.technicalQuestions.length} questions</span>
                            </div>
                            <div className='q-list'>
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className='content-header'>
                                <h2>Behavioral Questions</h2>
                                <span className='content-header__count'>{report.behavioralQuestions.length} questions</span>
                            </div>
                            <div className='q-list'>
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className='content-header'>
                                <h2>Preparation Road Map</h2>
                                <span className='content-header__count'>{report.preparationPlan.length}-day plan</span>
                            </div>
                            <div className='roadmap-list'>
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <div className='interview-divider' />

                {/* ── Right Sidebar ── */}
                <aside className='interview-sidebar'>

                    {/* Match Score */}
                    <p className='sidebar-label'>Match Score</p>
                    <div className='match-score'>
                        <div className='match-score__ring-row'>
                            <div className={`score-ring ${scoreColor}`}>
                                <svg width="76" height="76" viewBox="0 0 76 76">
                                    <circle className='ring-track' cx="38" cy="38" r="34" />
                                    <circle
                                        className='ring-progress'
                                        cx="38" cy="38" r="34"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={offset}
                                    />
                                </svg>
                                <div className='ring-center'>
                                    <span className='ring-val'>{report.matchScore}</span>
                                    <span className='ring-pct'>%</span>
                                </div>
                            </div>
                            <div className='match-score__meta'>
                                <p className='match-score__label'>Score</p>
                                <p className='match-score__verdict'>
                                    {report.matchScore >= 80 ? 'Strong Match' :
                                     report.matchScore >= 60 ? 'Good Match' : 'Weak Match'}
                                </p>
                                <p className='match-score__sub'>
                                    {report.matchScore >= 80 ? 'Strong match for this role' :
                                     report.matchScore >= 60 ? 'Moderate fit for this role' : 'Consider upskilling'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='sidebar-divider' />

                    {/* Skill Gaps */}
                    <div className='skill-gaps'>
                        <p className='sidebar-label'>Skill Gaps</p>
                        <div className='skill-gaps__pills'>
                            {report.skillGaps.map((gap, i) => (
                                <span key={i} className={`skill-pill skill-pill--${gap.severity}`}>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    )
}

export default Interview