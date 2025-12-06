'use client'

import { ArrowRight, Globe, Lock, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button, buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { MaxWidthWrapper } from '@/components/max-width-wrapper'

export default function Home() {
  return (
    <div className="space-y-8 py-10 md:space-y-14 md:py-12">
      {/* Hero Section */}
      <section>
        <MaxWidthWrapper>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-4">
              <header className="space-y-2">
                <h1 className="text-text-balance text-5xl font-bold tracking-tight md:text-6xl">
                  Connect Instantly with <span className="text-primary">ChatX</span>
                </h1>
                <p className="text-muted-foreground text-xl leading-relaxed">
                  Experience the realtime chat platform. Communicate seamlessly and stay connected
                  with everyone.
                </p>
              </header>
              <Link to="/chat" className={buttonVariants()}>
                Start Chatting Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Chat Preview */}
            <div className="relative h-96 md:h-full">
              <div className="from-primary/20 to-primary/5 border-primary/20 absolute inset-0 rounded-2xl border bg-linear-to-br p-4 backdrop-blur-sm">
                <div className="bg-card border-border flex h-full flex-col overflow-hidden rounded-xl border">
                  <div className="border-border flex items-center justify-between border-b px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
                        <span className="text-primary text-sm font-semibold">JD</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">John Doe</p>
                        <p className="text-xs text-green-500">Online</p>
                      </div>
                    </div>
                    <div className="bg-primary/20 h-6 w-6 rounded-full" />
                  </div>
                  <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                    <div className="flex justify-start gap-2">
                      <div className="bg-muted max-w-xs rounded-lg px-3 py-2 text-sm">
                        Hey, how's it going?
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <div className="bg-primary text-primary-foreground max-w-xs rounded-lg px-3 py-2 text-sm">
                        All good! Just working on the new chat app
                      </div>
                    </div>
                    <div className="flex justify-start gap-2">
                      <div className="bg-muted max-w-xs rounded-lg px-3 py-2 text-sm">
                        That's awesome! Want to grab coffee?
                      </div>
                    </div>
                  </div>
                  <div className="border-border border-t px-4 py-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground flex-1 rounded-lg border px-3 py-2 text-sm"
                      />
                      <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 transition">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <Separator />

      {/* Features Section */}
      <section>
        <MaxWidthWrapper>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">Powerful Features</h2>
            <p className="text-muted-foreground text-xl">
              Everything you need for seamless communication
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Fast message delivery with real-time synchronization'
              },
              {
                icon: Lock,
                title: 'Secure & Private',
                description: 'End-to-end encryption ensuring your conversations stay private'
              },
              { icon: Globe, title: 'Global Scale', description: 'Connect with users worldwide' }
            ].map((feature, i) => (
              <div
                key={i}
                className="border-border bg-card hover:bg-card/80 rounded-xl border p-6 transition"
              >
                <div className="bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  <feature.icon className="text-primary h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* CTA Section */}
      <section>
        <MaxWidthWrapper className="bg-primary/40 flex flex-col items-center rounded-md py-12">
          <h2 className="mb-4 text-4xl font-bold">Ready to Connect?</h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-center text-xl">
            Join thousands of users already enjoying seamless, real-time communication with ChatX.
          </p>
          <Button size="lg" asChild>
            <Link to="/chat" className="gap-2">
              Launch ChatX <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}
