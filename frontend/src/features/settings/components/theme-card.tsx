import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ModeToggle } from '@/components/mode-toggle'

export function ThemeCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription>Set the theme for the system</CardDescription>
      </CardHeader>
      <CardContent>
        <ModeToggle />
      </CardContent>
    </Card>
  )
}
