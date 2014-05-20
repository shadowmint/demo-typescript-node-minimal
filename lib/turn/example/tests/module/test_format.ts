/// <reference path="__init__.ts"/>
module tests {
    export class TestFormat extends turn.TestCase {
        test_can_format_string_with_replace():void {
            var input = "{} Test text {} dafdsaf {}";
            var output = this.format(input, 'ONE', 'TWO', 'THREE');
            this.assert.equals(output, 'ONE Test text TWO dafdsaf THREE');
        }

        test_can_format_string_without_replace():void {
            var input = "Test text dafdsaf"
            var output = this.format(input, 'ONE', 'TWO', 'THREE')
            this.assert.equals(output, 'Test text dafdsaf');
        }
    }
}
