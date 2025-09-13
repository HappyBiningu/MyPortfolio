import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Terminal, GitCommit, GitBranch, Clock } from "lucide-react";
import { useGitHubActivity } from "@/hooks/useGitHubData";
import { formatDistanceToNow } from "date-fns";

interface TerminalLine {
  id: string;
  text: string;
  type: 'command' | 'output' | 'commit' | 'branch';
  timestamp?: string;
}

export default function LiveTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const { data: githubActivity, isLoading } = useGitHubActivity();
  const [isTyping, setIsTyping] = useState(false);

  const terminalCommands = [
    { text: "$ git status", type: 'command' as const },
    { text: "On branch main", type: 'output' as const },
    { text: "Your branch is up to date with 'origin/main'", type: 'output' as const },
    { text: "$ git log --oneline -n 5", type: 'command' as const },
  ];

  useEffect(() => {
    // Initialize with basic terminal commands
    const initialLines: TerminalLine[] = [
      { id: '1', text: 'Tinotenda@portfolio:~$ ', type: 'command' },
      { id: '2', text: 'Welcome to my development environment', type: 'output' },
      { id: '3', text: 'Connecting to GitHub...', type: 'output' },
    ];

    setLines(initialLines);

    // Add GitHub activity if available
    if (githubActivity && Array.isArray(githubActivity)) {
      const activityLines: TerminalLine[] = githubActivity.slice(0, 5).map((event: any, index: number) => {
        const eventType = event.type;
        let text = '';
        
        switch (eventType) {
          case 'PushEvent':
            const commits = event.payload?.commits || [];
            text = commits.length > 0 
              ? `📝 Pushed ${commits.length} commit(s) to ${event.repo?.name}`
              : `📝 Pushed to ${event.repo?.name}`;
            break;
          case 'CreateEvent':
            text = `🌟 Created ${event.payload?.ref_type} in ${event.repo?.name}`;
            break;
          case 'ForkEvent':
            text = `🍴 Forked ${event.repo?.name}`;
            break;
          case 'WatchEvent':
            text = `⭐ Starred ${event.repo?.name}`;
            break;
          case 'IssuesEvent':
            text = `🐛 ${event.payload?.action} issue in ${event.repo?.name}`;
            break;
          default:
            text = `🔧 Activity in ${event.repo?.name}`;
        }

        return {
          id: `activity-${index}`,
          text: `${text} (${formatDistanceToNow(new Date(event.created_at))} ago)`,
          type: 'commit' as const,
          timestamp: event.created_at
        };
      });

      const updatedLines = [
        ...initialLines,
        { id: '4', text: '✅ Connected to GitHub successfully', type: 'output' },
        { id: '5', text: '$ git log --activity --live', type: 'command' },
        { id: '6', text: 'Recent GitHub Activity:', type: 'output' },
        ...activityLines,
        { id: 'cursor', text: '$ _', type: 'command' }
      ];

      setLines(updatedLines);
    }
  }, [githubActivity]);

  // Typing animation effect
  useEffect(() => {
    if (lines.length === 0) return;

    const interval = setInterval(() => {
      setIsTyping(prev => !prev);
    }, 800);

    return () => clearInterval(interval);
  }, [lines]);

  return (
    <section className="py-16 bg-gray-900 text-green-400 font-mono">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-heading font-bold mb-4 text-white">
            Live Development Environment
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real-time view of my coding activity and GitHub contributions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
            {/* Terminal Header */}
            <div className="bg-gray-700 px-4 py-3 flex items-center gap-3 border-b border-gray-600">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Terminal className="h-4 w-4" />
                <span className="text-sm">terminal — bash — 80×24</span>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 bg-gray-900 min-h-[400px] max-h-[500px] overflow-y-auto">
              <AnimatePresence>
                {lines.map((line, index) => (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`mb-2 ${
                      line.type === 'command' 
                        ? 'text-green-400' 
                        : line.type === 'commit'
                        ? 'text-blue-400 flex items-center gap-2'
                        : line.type === 'branch'
                        ? 'text-purple-400 flex items-center gap-2'
                        : 'text-gray-300'
                    }`}
                  >
                    {line.type === 'commit' && <GitCommit className="h-3 w-3 flex-shrink-0" />}
                    {line.type === 'branch' && <GitBranch className="h-3 w-3 flex-shrink-0" />}
                    <span>{line.text}</span>
                    {line.id === 'cursor' && (
                      <motion.span
                        animate={{ opacity: isTyping ? 0 : 1 }}
                        transition={{ duration: 0.1 }}
                        className="bg-green-400 w-2 h-5 inline-block ml-1"
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-yellow-400 flex items-center gap-2"
                >
                  <Clock className="h-3 w-3 animate-spin" />
                  <span>Loading GitHub activity...</span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Terminal Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
            <div className="text-green-400 text-2xl font-bold mb-2">24/7</div>
            <div className="text-gray-400 text-sm">Active Development</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
            <div className="text-blue-400 text-2xl font-bold mb-2">Real-time</div>
            <div className="text-gray-400 text-sm">GitHub Sync</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
            <div className="text-purple-400 text-2xl font-bold mb-2">Live</div>
            <div className="text-gray-400 text-sm">Code Updates</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}